"use client";
import { useState } from "react";
import RideCard from "./RideCard";

export const RidesList = () => {
  const url = "https://api.multiavatar.com/stefan.svg";
  const [rides, setRides] = useState([
    {
      profilePhoto: url,
      name: "Pedrito",
      from: "Caracas",
      to: "Baruta",
      time: "8:00am",
    },
    {
      profilePhoto: url,
      name: "María",
      from: "Los Teques",
      to: "Chacao",
      time: "9:30am",
    },
    {
      profilePhoto: url,
      name: "Juan",
      from: "La Guaira",
      to: "La Trinidad",
      time: "10:45am",
    },
    {
      profilePhoto: url,
      name: "Ana",
      from: "Petare",
      to: "La California",
      time: "11:15am",
    },
  ]);

  const [activateModal, setActivateModal] = useState(false);

  const showModal = () => {
    setActivateModal(true);
  };

  const hiddeModal = () => {
    setActivateModal(false);
  };

  return (
    <div>
      <div className="container p-2 m-auto transition-all  space-y-3">
        {rides.map((elem) => {
          return <RideCard onButtonClick={showModal} {...elem} />;
        })}
      </div>

      {activateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
          <div className="bg-white border-solid border-2 border-black rounded-md p-2 min-h-96">
            <h2>Texto de prueba</h2>
            <button className="bg-red-500 p-1 " onClick={hiddeModal}>Cerrar</button>



          </div>
        </div>
      )}
    </div>
  );
};
