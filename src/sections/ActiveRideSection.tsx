import Image from "next/image";
import RequestRideForm from "@/components/RequestRideForm";
import carpool from "@/assets/carpool_2.svg";
import { getUserRide } from "@/lib/actions/rides";
import UserCurrentRide from "@/components/UserCurrentRide";

interface Ride {
  id: number;
  origin: string;
  destination: string;
  status: string;
  ride: null;
}

const ActiveRideSection = async () => {
  const ride = await getUserRide() as Ride[];
  return (
    <section className="mt-10 w-full max-w-lg px-6 text-center">
        {ride.length !== 0 ? (
          <UserCurrentRide
            userId={ride[0]?.id}
            from={ride[0]?.origin}
            to={ride[0]?.destination}
            ride={ride[0]?.ride}
            status={ride[0]?.status}
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
  );
};

export default ActiveRideSection;
