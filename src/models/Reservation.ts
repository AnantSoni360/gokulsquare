import mongoose from "mongoose";

export interface IReservation extends mongoose.Document {
  type: "DINING" | "LODGING";
  name?: string;
  phone: string;
  guests: number;
  status: "PENDING" | "CONFIRMED" | "REJECTED";
  createdAt: Date;
  
  // Dining specific
  date?: string;
  time?: string;
  table?: string;

  // Lodging specific
  checkIn?: string;
  checkOut?: string;
  roomName?: string;
  email?: string;
}

const ReservationSchema = new mongoose.Schema({
  type: { type: String, enum: ["DINING", "LODGING"], default: "DINING" },
  name: { type: String, required: false },
  phone: { type: String, required: true },
  guests: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["PENDING", "CONFIRMED", "REJECTED"], 
    default: "PENDING" 
  },
  createdAt: { type: Date, default: Date.now },

  // Dining specific
  date: { type: String, required: false },
  time: { type: String, required: false },
  table: { type: String, required: false },

  // Lodging specific
  checkIn: { type: String, required: false },
  checkOut: { type: String, required: false },
  roomName: { type: String, required: false },
  email: { type: String, required: false },
});

export default mongoose.models.Reservation || mongoose.model<IReservation>("Reservation", ReservationSchema);
