import Image from "next/image";
import RequestRideForm from "@/components/RequestRideForm";
import carpool from "@/assets/carpool_2.svg";
import { getUserRide } from "@/lib/actions/rides";
import UserCurrentRideCard from "@/components/UserCurrentRideCard";

const ActiveRideSection = async () => {
  const ride = await getUserRide();
  return (
    <section className="mt-10 w-full max-w-lg px-6 text-center">
      {ride.length !== 0 ? (
        <div className="flex flex-col gap-8 md:gap-12 text-left md:text-center">
          <h1 className="text-2xl font-bold">¡Tienes una cola solicitada!</h1>
          <UserCurrentRideCard
            userId={ride[0]?.id}
            from={ride[0]?.origin}
            to={ride[0]?.destination}
            ride={ride[0]?.ride}
            status={ride[0]?.status}
          />
        </div>
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
