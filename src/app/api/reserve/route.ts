import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Reservation from "@/models/Reservation";
import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone, guests, date, time, table } = body;

    if (!name || !phone || !date || !time || !table) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();

    // Create reservation in DB
    const reservation = await Reservation.create({
      name,
      phone,
      guests,
      date,
      time,
      table,
      status: "PENDING",
    });

    // Send WhatsApp to Owner
    const ownerPhone = process.env.OWNER_PHONE_NUMBER;
    const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
    
    // Format numbers for WhatsApp
    const to = ownerPhone?.startsWith('whatsapp:') ? ownerPhone : `whatsapp:${ownerPhone}`;
    const from = twilioPhone?.startsWith('whatsapp:') ? twilioPhone : `whatsapp:${twilioPhone}`;

    const messageBody = `*New Reservation Request!*\n\nCustomer: ${name}\nPhone: ${phone}\nTable: ${table}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}\n\nReply *YES* to accept or *NO* to decline.`;

    await client.messages.create({
      body: messageBody,
      from,
      to,
    });

    return NextResponse.json({ success: true, reservation });
  } catch (error: any) {
    console.error("Booking API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
