import React, { useState } from "react";
import Swal from "sweetalert2";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Button } from "@nextui-org/react";

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
    Swal.fire({
      title: "Estas Seguro?",
      text: "Texto",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, lo estoy",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div  className="  bg-gradient-to-r from-slate-300 to-whitefont-semibold border-solid border-2 rounded-lg shadow-lg px-1">
      <p className="text-l font-bold rounded-sm p-1 text-gray-600">{name}</p>
      <div className="bg-white flex flex-col sm:flex-row sm:items-center min-w-36 font-semibold border-solid border-2 border-slate-100 rounded-lg p-4 shadow-lg">
        {/* Imagen y datos */}

        <div className="flex justify-center items-center mb-2">
          <div className="flex flex-col justify-start items-center sm:items-start">
            {/* Image Profile */}
            <img
              className=" w-14 h-14 rounded-full"
              src={profilePhoto}
              alt="Profile"
            />
          </div>

          {/* Data names, ride */}
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
        {/* Boton */}
        <div className=" w-full sm:ml-auto sm:w-auto flex justify-center ">
          <Button
            size="sm"
            className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 font-semibold text-white w-full"
            onClick={handleClick}
          >
            Dar Cola 🚖
          </Button>
        </div>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Mi ventana modal"
          size="sm"
          placement="center"
          closeButton
        >
          <ModalContent>
            <ModalHeader>Titulo</ModalHeader>
            <ModalBody>
              <p>Texto</p>
            </ModalBody>
            <ModalFooter className="text-sm">
              <Button className="bg-green-500">Boton</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default RideCard;
