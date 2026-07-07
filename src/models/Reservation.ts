import mongoose from "mongoose";

export interface IReservation extends mongoose.Document {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  table: string;
  status: "PENDING" | "CONFIRMED" | "REJECTED";
  createdAt: Date;
}

const ReservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  table: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["PENDING", "CONFIRMED", "REJECTED"], 
    default: "PENDING" 
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Reservation || mongoose.model<IReservation>("Reservation", ReservationSchema);
