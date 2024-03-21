import UserCurrentRideCard from "@/components/UserCurrentRideCard";
import { getUserCurrentRide } from "@/lib/actions/rides";
import OfferSeatsSection from "@/sections/OfferSeatsSection";

export default async function OffearSeats() {
  const currentRide = await getUserCurrentRide();
  return (
    <div className="w-full flex flex-col h-min justify-center items-center p-6">
      {currentRide.length === 0 ? (
        <OfferSeatsSection />
      ) : (
        <section className="w-full max-w-lg mt-10">
          <UserCurrentRideCard ride={currentRide[0]} />
        </section>
      )}
    </div>
  );
}
