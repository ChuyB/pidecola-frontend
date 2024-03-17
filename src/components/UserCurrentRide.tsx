import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import CancelRideButton from "./CancelRideButton";

interface UserCurrentRideProps {
  id: number;
  destination: string;
  origin: string;
  status: string;
  ride: null;
}

const UserCurrentRide = ({
  id,
  destination,
  origin,
  ride,
  status,
}: UserCurrentRideProps) => {
  return (
    <Card className="w-full animate-fade-up">
      <CardHeader>
        <h1 className="font-bold text-lg text-neutral-700">Cola solicitada</h1>
      </CardHeader>
      <Divider />
      <CardBody className="uppercase font-bold text-sm">
        <p>
          Desde: <span className="text-blue-700">{origin}</span>
        </p>
        <p>
          Hasta: <span className="text-blue-700">{destination}</span>
        </p>
      </CardBody>
      <CardFooter className="flex flex-row justify-between">
        {ride ? ride : <Status status={status} />}
        <CancelRideButton id={id} />
      </CardFooter>
    </Card>
  );
};

const Status = ({ status }: { status: string }) => {
  let color = "";
  switch (status) {
    case "pendiente":
      color = "text-warning";
      break;
    case "iniciado":
      color = "text-green-700";
      break;
    case "terminado":
      color = "text-blue-700";
      break;
    case "cancelado":
      color = "text-danger";
      break;
    default:
      color = "text-gray-700";
      break;
  }
  return <p className={`uppercase font-medium ${color}`}>{status}</p>;
};

export default UserCurrentRide;
