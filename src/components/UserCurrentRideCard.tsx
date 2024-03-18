import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import CancelRideButton from "./CancelRideButton";
import RideStatus from "./RideStatus";

interface UserCurrentRideProps {
  userId: number;
  to: string;
  from: string;
  status: string;
  ride: null;
}

const UserCurrentRideCard = ({
  userId,
  to,
  from,
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
          Desde: <span className="text-blue-700">{from}</span>
        </p>
        <p>
          Hasta: <span className="text-blue-700">{to}</span>
        </p>
      </CardBody>
      <CardFooter className="flex flex-row justify-between">
        {ride ? ride : <RideStatus status={status} />}
        <CancelRideButton id={userId} />
      </CardFooter>
    </Card>
  );
};

export default UserCurrentRideCard;
