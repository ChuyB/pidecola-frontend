import React, { useState } from "react";
import {
  Button,
  Avatar,
  Card,
  CardHeader,
  CardBody,
  Divider,
  CardFooter,
} from "@nextui-org/react";

interface RideCardProps {
  profilePhoto: string;
  name: string;
  from: string;
  to: string;
  time: string;
  onClick?: () => void;
}

const RideCard: React.FC<RideCardProps> = ({
  profilePhoto,
  name,
  from,
  to,
  time,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    alert("Falta implementar modal");
  };

  return (
    <Card shadow="lg" className="my-2 shadow-lg">
      <CardHeader className="-mb-1 bg-gradient-to-tr from-slate-200 via-slate-50  to-white py-1 px-2 shadow-md">
        <Avatar size="md" src={profilePhoto} alt="Profile" />
        <p className="mx-4 text-l sm:text-xl font-bold text-slate-600">
          {name}
        </p>
      </CardHeader>
      <Divider />
      <CardBody className=" p-4 border-solid border-black shadow-md rounded-md">
        <div className="flex flex-col sm:justify-between sm:flex-row sm:items-center">
          <div className="flex  gap-3 text-sm sm:text-base self-start">
            <div>
              <p>Desde</p>
              <p className="text-blue-500 font-semibold">{from}</p>
            </div>
            <div>
              <p>Hasta</p>
              <p className="text-green-600 font-semibold">{to}</p>
            </div>
          </div>
          <Button
            onClick={handleClick}
            color="primary"
            size="sm"
            className="w-full font-bold sm:w-fit mt-2 sm:mt-0"
          >
            Dar Cola
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default RideCard;
