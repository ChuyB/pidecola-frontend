"use client"
import OfferSeatsForm from "@/components/OfferSeats/OfferSeatsForm";
import OfferSeatsProvider from "@/components/OfferSeats/OfferSeatsProvider";

const OfferSeatsSection = () => {
  return (
    <OfferSeatsProvider>
      <OfferSeatsForm />
    </OfferSeatsProvider>
  );
};

export default OfferSeatsSection;
