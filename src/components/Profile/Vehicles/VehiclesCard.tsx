import { getUserVehicles } from "@/lib/actions/users";
import UserVehiclesTable from "./UserVehiclesTable";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

const VehiclesCard = async () => {
  const vehicles = await getUserVehicles();
  if (!vehicles) return;
  return (
    <Card className="grow w-full max-w-xl">
      <CardHeader>
        <h1 className="uppercase text-gray-500">Tus vehículos</h1>
      </CardHeader>
      <CardBody>
        <UserVehiclesTable vehicles={vehicles} />
      </CardBody>
    </Card>
  );
};

export default VehiclesCard;
