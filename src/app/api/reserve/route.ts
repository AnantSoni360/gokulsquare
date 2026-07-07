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

    // Automatically format phone number for India (+91) if user forgot it
    let formattedPhone = phone.trim();
    if (formattedPhone.length === 10 && !formattedPhone.startsWith("+")) {
      formattedPhone = `+91${formattedPhone}`;
    } else if (formattedPhone.startsWith("0")) {
      formattedPhone = `+91${formattedPhone.slice(1)}`;
    }

    await dbConnect();

    // Create reservation in DB
    const reservation = await Reservation.create({
      name,
      phone: formattedPhone,
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

    const messageBody = `*New Reservation Request!*\n\nCustomer: ${name}\nPhone: ${formattedPhone}\nTable: ${table}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}\n\nReply *YES* to accept or *NO* to decline.`;

    await client.messages.create({
      body: messageBody,
      from,
      to,
    });

    return NextResponse.json({ success: true, reservation });
  } catch (error: any) {
    console.error("Booking API Error:", error);
    // Return detailed error for debugging
    const errorMessage = error?.message || "Unknown error";
    const errorStack = error?.stack || "";
    return NextResponse.json({ 
      error: `API Error: ${errorMessage}`,
      details: errorStack
    }, { status: 500 });
  }
}
