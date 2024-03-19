import UserVehicles from '../../components/UserVehicles';
import { Vehicle } from './columns';
import { getUserVehicles } from "@/lib/actions/users";


export default async function Vehicles() {
	
  const vehicles = await getUserVehicles() as Vehicle[];
	return (
    <div className="relative overflow-hidden w-full flex flex-grow items-center justify-center">
      <UserVehicles vehicles={vehicles}/>
    </div>
  );
}