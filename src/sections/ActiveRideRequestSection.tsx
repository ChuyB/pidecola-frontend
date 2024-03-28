import Image from "next/image";
import RequestRideForm from "@/components/CurrentRequest/RequestRideForm";
import carpool from "@/assets/carpool_2.svg";
import { getUserCurrentRequest } from "@/lib/actions/rides";
import UserCurrentRequestCard from "@/components/CurrentRequest/UserCurrentRequestCard";

const ActiveRideRequestSection = async () => {
  const request = await getUserCurrentRequest();

  const renderTitle = (status: string) => {
    if (status === "finalizado")
      return (
        <div>
          <h1 className="text-2xl font-bold">¡Tu cola ha finalizado!</h1>
          <p className="text-md font-semibold text-gray-500">
            Recuerda dar una valoración a tu conductor
          </p>
        </div>
      );
    return <h1 className="text-2xl font-bold">¡Tienes una cola solicitada!</h1>;
  };

  return (
    <section className="mt-10 w-full max-w-lg px-6 text-center">
      {request ? (
        <div className="flex flex-col gap-8 md:gap-12 text-left md:text-center">
          {renderTitle(request.status)}
          <UserCurrentRequestCard
            id={request.id}
            from={request.origin}
            to={request.destination}
            driver={request.driver}
            status={request.status}
            isReviewed={request.is_reviewed}
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

export default ActiveRideRequestSection;
