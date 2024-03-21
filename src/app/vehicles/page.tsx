import UserVehicles from "@/components/UserVehicles";
import { getUserVehicles } from "@/lib/actions/users";

export default async function Vehicles() {
  const vehicles = await getUserVehicles();
  if (!vehicles) return;
  return (
    <div className="relative overflow-hidden w-full flex flex-grow items-center justify-center">
      <UserVehicles vehicles={vehicles} />
    </div>
  );
}
