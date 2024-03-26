import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Divider,
  Tooltip,
} from "@nextui-org/react";
import { UserPlusIcon } from "@heroicons/react/16/solid";

interface RideCardProps {
  // profilePhoto: string;
  id: number;
  name: string;
  from: string;
  to: string;
  time: string;
  onSelect: (id: number) => void;
}

const RideCard: React.FC<RideCardProps> = ({
  id,
  name,
  from,
  to,
  onSelect,
}) => {
  return (
    <Card>
      <CardHeader>
        {/*
          -- TODO: Profile image fetching
        <Avatar size="md" src={profilePhoto} alt="Profile" />
        */}
        <h1 className="text-lg sm:text-xl font-bold">{name}</h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex flex-row justify-between items-center">
          <section className="uppercase font-bold text-sm">
            <p>
              Desde: <span className="text-blue-700">{from}</span>
            </p>
            <p>
              Hasta: <span className="text-blue-700">{to}</span>
            </p>
          </section>
          <Tooltip content="Añadir pasajero" showArrow>
            <Button
              isIconOnly
              color="primary"
              variant="ghost"
              size="sm"
              onClick={() => onSelect(id)}
            >
              <UserPlusIcon className="h-1/2" />
            </Button>
          </Tooltip>
        </div>
      </CardBody>
    </Card>
  );
};

export default RideCard;
