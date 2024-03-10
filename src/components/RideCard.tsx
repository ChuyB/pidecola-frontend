import React from "react";
import { Button } from "@nextui-org/react";

interface RideCardProps {
  profilePhoto: string;
  name: string;
  from: string;
  to: string;
  time: string;
  onButtonClick?: () => void; // Agregar un callback opcional para el evento de clic del botón
}

const RideCard: React.FC<RideCardProps> = ({
  profilePhoto,
  name,
  from,
  to,
  time,
  onButtonClick = () => alert("Hello"), // Asignar una función predeterminada si no se proporciona ninguna
}) => {
  const handleClick = () => {
    onButtonClick();
  };

  return (
    <div className="bg-gradient-to-r from-slate-200 to-white font-semibold border-solid border-2 border-slate-100 rounded-lg  p-4 flex flex-col sm:flex-row items-center sm:justify-between space-x-0 sm:space-x-4 shadow-lg">
      <div className="flex items-center mb-4 sm:mb-0 w-8/12">
        {/* Image Profile */}
        <img
          className="w-24 h-24 rounded-full"
          src={profilePhoto}
          alt="Profile"
        />
        {/* Data names, ride */}
        <div className="ml-4 space-y-2">
          <h1 className="text-xl font-bold">{name}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-6 gap-1 ">
            <div className="rounded-lg border-black">
              <p className="text-sm text-gray-500">📍 Desde:</p>
              <p className="text-sm text-gray-500">{from}</p>
            </div>
            <hr className="sm:hidden" />
            <div className=" rounded-lg">
              <p className="text-sm text-gray-500">🏳️ Hasta:</p>
              <p className="text-sm text-gray-500"> {to}</p>
              <hr className="sm:hidden" />
            </div>
            <p className="text-sm text-gray-500 sm:col-span-2">
              ⌚ Hora: {time}
            </p>
          </div>
        </div>
      </div>

      <div className="sm:ml-auto  sm:w-auto flex justify-end w-8/12">
        <Button
          size="sm"
          className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 font-semibold text-white w-full"
          onClick={handleClick}
        >
          Dar Cola 🚖
        </Button>
      </div>
    </div>
  );
};

export default RideCard;
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  fill="currentColor"
  className="w-6 h-6"
>
  <path
    fillRule="evenodd"
    d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
    clipRule="evenodd"
  />
</svg>;
