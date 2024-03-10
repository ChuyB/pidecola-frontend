import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";

interface UserCurrentRideProps {
  destination: string;
  origin: string;
  ride: null;
}

const UserCurrentRide = ({
  destination,
  origin,
  ride,
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
      <CardFooter>
        {ride ? (
          ride
        ) : (
          <p className="uppercase font-medium text-warning">
            Pendiente
          </p>
        )}
      </CardFooter>
    </Card>
  );
};
export default UserCurrentRide;
