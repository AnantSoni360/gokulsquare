import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Reservation from "@/models/Reservation";
import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function POST(req: Request) {
  try {
    // Twilio sends data as form-urlencoded
    const text = await req.text();
    const params = new URLSearchParams(text);
    
    const body = params.get("Body")?.trim().toUpperCase() || "";
    const from = params.get("From") || ""; // Owner's WhatsApp
    
    const ownerPhone = process.env.OWNER_PHONE_NUMBER || "";
    const formattedOwner = ownerPhone.startsWith("whatsapp:") ? ownerPhone : `whatsapp:${ownerPhone}`;

    // Only process if it's the owner replying
    if (from !== formattedOwner) {
      return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?><Response></Response>`, {
        status: 200,
        headers: { "Content-Type": "text/xml" }
      });
    }

    await dbConnect();

    // Find the latest pending reservation
    const pendingReservation = await Reservation.findOne({ status: "PENDING" }).sort({ createdAt: -1 });

    if (!pendingReservation) {
      await client.messages.create({
        body: "No pending reservations found.",
        from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
        to: from,
      });
      return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?><Response></Response>`, {
        status: 200,
        headers: { "Content-Type": "text/xml" }
      });
    }

    const customerPhone = pendingReservation.phone;
    const toCustomer = customerPhone.startsWith("whatsapp:") ? customerPhone : `whatsapp:${customerPhone}`;
    const twilioPhone = `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`;

    if (body === "YES" || body === "Y") {
      pendingReservation.status = "CONFIRMED";
      await pendingReservation.save();

      // Send confirmation to customer
      await client.messages.create({
        body: `🎉 *Reservation Confirmed!*\n\nDear ${pendingReservation.name},\nYour table *${pendingReservation.table}* is reserved for *${pendingReservation.date}* at *${pendingReservation.time}* for ${pendingReservation.guests} guests.\n\nWe look forward to serving you at Gokul Square!`,
        from: twilioPhone,
        to: toCustomer,
      });

      // Confirm to owner
      await client.messages.create({
        body: "Reservation confirmed. Customer has been notified.",
        from: twilioPhone,
        to: from,
      });

    } else if (body === "NO" || body === "N") {
      pendingReservation.status = "REJECTED";
      await pendingReservation.save();

      // Send rejection to customer
      await client.messages.create({
        body: `😔 *Reservation Update*\n\nDear ${pendingReservation.name},\nWe are sorry, but we cannot accommodate your booking for table *${pendingReservation.table}* at this time.\n\nPlease choose another time or contact our receptionist directly.`,
        from: twilioPhone,
        to: toCustomer,
      });

      // Confirm to owner
      await client.messages.create({
        body: "Reservation declined. Customer has been notified.",
        from: twilioPhone,
        to: from,
      });
    } else {
      // Invalid command
      await client.messages.create({
        body: "Please reply with exactly *YES* or *NO*.",
        from: twilioPhone,
        to: from,
      });
    }

    // Twilio requires TwiML response (empty is fine if we use API to send messages)
    return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?><Response></Response>`, {
      status: 200,
      headers: { "Content-Type": "text/xml" }
    });

  } catch (error: any) {
    console.error("Webhook Error:", error);
    return new NextResponse(`<?xml version="1.0" encoding="UTF-8"?><Response></Response>`, {
      status: 500,
      headers: { "Content-Type": "text/xml" }
    });
  }
}
