import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Reservation from "@/models/Reservation";
import twilio from "twilio";
import nodemailer from "nodemailer";

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

      // Send confirmation to customer based on TYPE
      let confirmMessage = "";
      if (pendingReservation.type === "LODGING") {
        confirmMessage = `🎉 *Lodging Confirmed!*\n\nDear ${pendingReservation.name || "Guest"},\nYour stay at Gokul Square is confirmed!\n\nRoom: *${pendingReservation.roomName}*\nCheck-In: *${pendingReservation.checkIn}*\nCheck-Out: *${pendingReservation.checkOut}*\n\nWe look forward to welcoming you!`;
      } else {
        confirmMessage = `🎉 *Reservation Confirmed!*\n\nDear ${pendingReservation.name || "Guest"},\nYour table *${pendingReservation.table}* is reserved for *${pendingReservation.date}* at *${pendingReservation.time}* for ${pendingReservation.guests} guests.\n\nWe look forward to serving you at Gokul Square!`;
      }

      await client.messages.create({
        body: confirmMessage,
        from: twilioPhone,
        to: toCustomer,
      });

      // Send Email if email exists
      if (pendingReservation.email && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
          const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
          });

          let emailSubject = "";
          let emailHtml = "";

          if (pendingReservation.type === "LODGING") {
            emailSubject = "Reservation Confirmed - Gokul Square";
            emailHtml = `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #FF8A00;">Lodging Confirmed!</h2>
                <p>Dear ${pendingReservation.name || "Guest"},</p>
                <p>Your stay at Gokul Square is officially confirmed. Here are your details:</p>
                <ul>
                  <li><strong>Room:</strong> ${pendingReservation.roomName}</li>
                  <li><strong>Check-In:</strong> ${pendingReservation.checkIn}</li>
                  <li><strong>Check-Out:</strong> ${pendingReservation.checkOut}</li>
                  <li><strong>Guests:</strong> ${pendingReservation.guests}</li>
                </ul>
                <p>If you have any questions, feel free to reply to this email.</p>
                <br/>
                <p>Best regards,<br/><strong>Gokul Square Team</strong></p>
              </div>
            `;
          } else {
            emailSubject = "Table Reservation Confirmed - Gokul Square";
            emailHtml = `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #FF8A00;">Table Reserved!</h2>
                <p>Dear ${pendingReservation.name || "Guest"},</p>
                <p>Your table reservation at Gokul Square is officially confirmed. Here are your details:</p>
                <ul>
                  <li><strong>Table:</strong> ${pendingReservation.table}</li>
                  <li><strong>Date:</strong> ${pendingReservation.date}</li>
                  <li><strong>Time:</strong> ${pendingReservation.time}</li>
                  <li><strong>Guests:</strong> ${pendingReservation.guests}</li>
                </ul>
                <p>We look forward to serving you!</p>
                <br/>
                <p>Best regards,<br/><strong>Gokul Square Team</strong></p>
              </div>
            `;
          }

          await transporter.sendMail({
            from: `"Gokul Square" <${process.env.EMAIL_USER}>`,
            to: pendingReservation.email,
            subject: emailSubject,
            html: emailHtml,
          });
          console.log("Email sent successfully to", pendingReservation.email);
        } catch (emailErr) {
          console.error("Failed to send email:", emailErr);
        }
      }

      // Confirm to owner
      await client.messages.create({
        body: `${pendingReservation.type} Reservation confirmed. Customer has been notified.`,
        from: twilioPhone,
        to: from,
      });

    } else if (body === "NO" || body === "N") {
      pendingReservation.status = "REJECTED";
      await pendingReservation.save();

      // Send rejection to customer based on TYPE
      let rejectMessage = "";
      if (pendingReservation.type === "LODGING") {
        rejectMessage = `😔 *Reservation Update*\n\nDear ${pendingReservation.name || "Guest"},\nWe are sorry, but we cannot accommodate your booking for the *${pendingReservation.roomName}* on your requested dates.\n\nPlease contact reception for alternate dates.`;
      } else {
        rejectMessage = `😔 *Reservation Update*\n\nDear ${pendingReservation.name || "Guest"},\nWe are sorry, but we cannot accommodate your booking for table *${pendingReservation.table}* at this time.\n\nPlease choose another time or contact our receptionist directly.`;
      }

      await client.messages.create({
        body: rejectMessage,
        from: twilioPhone,
        to: toCustomer,
      });

      // Confirm to owner
      await client.messages.create({
        body: `${pendingReservation.type} Reservation declined. Customer has been notified.`,
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
