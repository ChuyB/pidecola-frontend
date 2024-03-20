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
import { PlusCircleIcon } from "@heroicons/react/16/solid";

interface RideCardProps {
  // profilePhoto: string;
  name: string;
  from: string;
  to: string;
  time: string;
  onClick?: () => void;
}

const RideCard: React.FC<RideCardProps> = ({
  // profilePhoto,
  name,
  from,
  to,
  time,
}) => {
  return (
    <Card>
      <CardHeader className="-mb-1 bg-gradient-to-tr from-slate-200 via-slate-50  to-white py-1 px-2 shadow-md">
        {/*
          -- TODO: Profile image fetching
        <Avatar size="md" src={profilePhoto} alt="Profile" />
        */}
        <h1 className="mx-4 text-l sm:text-xl font-bold text-slate-600">
          {name}
        </h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex flex-row justify-between items-center">
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
            startContent={<PlusCircleIcon className="h-1/2" />}
            color="primary"
            size="sm"
          >
            Dar Cola
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default RideCard;
