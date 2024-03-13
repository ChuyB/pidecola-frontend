"use client"

import UserVehicles from '../../components/UserVehicles';
import { Vehicle } from './columns';
import { useEffect, useState } from "react";
import { getUserVehicles } from "@/lib/actions/users";

const SERVER = process.env.NEXT_PUBLIC_API_URL;

export default function Vehicles() {
	const [vehicles, setVehicles] = useState<Vehicle[]>([]);

	getUserVehicles().then(data => setVehicles(data?.vehicles))
	return (
    <div className="relative overflow-hidden w-full flex flex-grow items-center justify-center">
      <UserVehicles vehicles={vehicles}/>
    </div>
  );
}