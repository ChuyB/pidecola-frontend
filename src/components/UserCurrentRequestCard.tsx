import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  User,
} from "@nextui-org/react";
import CancelRideButton from "./CancelRideButton";
import RideStatus from "./RideStatus";

interface UserCurrentRideProps {
  userId: number;
  to: string;
  from: string;
  driver: {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: number;
  } | null;
  status: string;
}

const UserCurrentRequestCard = ({
  userId,
  to,
  from,
  driver,
  status,
}: UserCurrentRideProps) => {
  return (
    <Card className="w-full animate-fade-up">
      <CardHeader>
        <h1 className="font-bold text-lg text-neutral-700">Cola solicitada</h1>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-col gap-8">
        {driver && (
          <section>
            <h3>Datos de tu conductor:</h3>
            <User
              name={`${driver.first_name} ${driver.last_name}`}
              description={driver.phone_number}
              avatarProps={{ name: driver.first_name }}
            />
          </section>
        )}
        <section className="uppercase font-bold text-sm">
          <p>
            Desde: <span className="text-blue-700">{from}</span>
          </p>
          <p>
            Hasta: <span className="text-blue-700">{to}</span>
          </p>
        </section>
      </CardBody>
      <CardFooter className="flex flex-row justify-between">
        <RideStatus status={status} />
        {status === "pendiente" && <CancelRideButton id={userId} />}
      </CardFooter>
    </Card>
  );
};

export default UserCurrentRequestCard;
