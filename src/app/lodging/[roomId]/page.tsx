import { RoomSlider } from "@/components/lodging/RoomSlider";
import { RoomInfo } from "@/components/lodging/RoomInfo";
import { BookingRequestFlow } from "@/components/lodging/BookingRequestFlow";

export const metadata = {
  title: 'Room Details | Gokul Square',
  description: 'View room details and request your stay.',
};

export default function RoomDetailsPage({ params }: { params: { roomId: string } }) {
  // Mock data based on roomId
  const roomNames: Record<string, string> = {
    deluxe: "Deluxe Room",
    premium: "Premium King Room",
    executive: "Executive Room",
    suite: "Luxury Suite"
  };
  
  const roomPrices: Record<string, string> = {
    deluxe: "₹2499",
    premium: "₹3499",
    executive: "₹4999",
    suite: "₹6999"
  };

  const name = roomNames[params.roomId] || "Luxury Room";
  const price = roomPrices[params.roomId] || "₹3499";

  return (
    <main className="bg-white min-h-screen text-[#1A1A1A]">
      <RoomSlider />
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-12">
        <RoomInfo roomName={name} price={price} />
        <BookingRequestFlow roomName={name} />
      </div>
    </main>
  );
}
