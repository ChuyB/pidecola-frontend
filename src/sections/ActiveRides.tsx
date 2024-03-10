"use client";

import { Skeleton } from "@nextui-org/react";
import Image from "next/image";
import RequestRideForm from "@/components/RequestRideForm";
import carpool from "@/assets/carpool_2.svg";
import { getUserRide } from "@/lib/actions/rides";
import UserCurrentRide from "@/components/UserCurrentRide";
import { useEffect, useState } from "react";

interface Ride {
  origin: string;
  destination: string;
  ride: null;
}

const ActiveRides = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [ride, setRide] = useState<Ride | null>(null);
  useEffect(() => {
    const fetchRide = async () => {
      const fetchedRide = await getUserRide();

      setIsLoading(true)
      setRide(fetchedRide?.[0]);
      setIsLoading(false)
    };

    fetchRide();
  }, []);

  return (
    <Skeleton isLoaded={!isLoading} className="rounded-lg w-full max-w-lg overflow-visible">
      <section className="mt-10 w-full max-w-lg px-6 text-center">
        {ride ? (
          <UserCurrentRide
            origin={ride.origin}
            destination={ride.destination}
            ride={ride.ride}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-9 animate-fade-up">
            <Image
              src={carpool}
              alt="Una imágen vectorizada de un grupo de personas junto a un vehículo"
            />
            <p className="font-bold text-xl text-gray-600 dark:text-gray-200">
              Parece que aún no has pedido alguna cola
            </p>
            <RequestRideForm />
          </div>
        )}
      </section>
    </Skeleton>
  );
};

export default ActiveRides;
