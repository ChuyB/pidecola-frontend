import React, { useState } from "react";
import { Button, Avatar } from "@nextui-org/react";

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
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    alert("Falta implementar modal");
  };

  return (
    <div className="  bg-gradient-to-r from-slate-300 to-whitefont-semibold border-solid border-2 rounded-lg shadow-lg px-1">
      <p className="text-l font-bold rounded-sm p-1 text-gray-600">{name}</p>
      <div className="bg-white flex flex-col sm:flex-row sm:items-center min-w-36 font-semibold border-solid border-2 border-slate-100 rounded-lg p-4 shadow-lg">
        <div className="flex justify-center items-center mb-2">
          <div className="flex flex-col justify-start items-center sm:items-start">
            <Avatar src={profilePhoto} name={name} />
          </div>
          <div className="ml-4 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-6 gap-1">
              <div className="rounded-lg border-black">
                <p className="text-tiny text-gray-500">📍 Desde:</p>
                <p className="text-tiny text-gray-500">{from}</p>
              </div>
              <hr className="sm:hidden" />
              <div className="rounded-lg">
                <p className="text-tiny text-gray-500">🏳️ Hasta:</p>
                <p className="text-tiny text-gray-500"> {to}</p>
                <hr className="sm:hidden" />
              </div>
              <p className=" text-tiny text-gray-500 sm:col-span-2">
                ⌚ Hora: {time}
              </p>
            </div>
          </div>
        </div>
        <div className=" w-full sm:ml-auto sm:w-auto flex justify-center ">
          <Button
            size="sm"
            className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 font-semibold text-white w-full"
            onClick={handleClick}
          >
            Dar Cola 🚖
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RideCard;
