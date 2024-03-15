"use client";
import { useState } from "react";
import RideCard from "./RideCard";

export const RidesList = () => {
  const url = "https://api.multiavatar.com/stefan.svg";
  const [rides, setRides] = useState([
    {
      id: 1,
      profilePhoto: url,
      name: "Felix",
      from: "Caracas",
      to: "Baruta",
      time: "8:00am",
    },
    {
      id: 2,
      profilePhoto: url,
      name: "María",
      from: "Los Teques",
      to: "Chacao",
      time: "9:30am",
    },
    {
      id: 3,
      profilePhoto: url,
      name: "Juan",
      from: "La Guaira",
      to: "La Trinidad",
      time: "10:45am",
    },
    {
      id: 4,
      profilePhoto: url,
      name: "Ana",
      from: "Petare",
      to: "La California",
      time: "11:15am",
    },
  ]);

  return (
    <div>
      <div className=" container mx-auto">
        {rides.map((elem) => {
          return <RideCard key={elem.id} {...elem} />;
        })}
      </div>
    </div>
  );
};
