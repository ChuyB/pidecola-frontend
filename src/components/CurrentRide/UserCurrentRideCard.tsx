import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  User,
} from "@nextui-org/react";
import RideStatus from "@/components/RideStatus";
import { Ride } from "@/lib/types/rides.type";
import BeginRideButton from "./BeginRideButton";
import FinishRideButton from "./FinishRideButton";

const UserCurrentRideCard = ({ ride }: { ride: Ride }) => {
  const renderChangeStatusButton = () => {
    if (ride.status === "pendiente") {
      return <BeginRideButton id={ride.id} />;
    } else if (ride.status === "iniciado") {
      return <FinishRideButton id={ride.id} />;
    }
  };
  return (
    <Card className="w-full animate-fade-up">
      <CardHeader>
        <h1 className="font-bold text-lg text-neutral-700">Viaje actual</h1>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-8">
        <section className="uppercase font-bold text-sm">
          <p>
            Desde: <span className="text-blue-700">{ride.origin}</span>
          </p>
          <p>
            Hasta: <span className="text-blue-700">{ride.destination}</span>
          </p>
        </section>
        <section>
          <h2 className="text-lg mb-2">Pasajeros:</h2>
          <div className="flex flex-row flex-wrap gap-4">
            {ride.passengers.map((passenger) => (
              <User
                key={passenger.id}
                name={`${passenger.first_name} ${passenger.last_name}`}
                description={passenger.phone_number}
                avatarProps={{ name: passenger.first_name }}
              />
            ))}
          </div>
        </section>
      </CardBody>
      <CardFooter className="flex flex-row justify-between">
        <RideStatus status={ride.status} />
        {renderChangeStatusButton()}
      </CardFooter>
    </Card>
  );
};

export default UserCurrentRideCard;
