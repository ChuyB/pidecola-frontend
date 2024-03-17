import { Chip } from "@nextui-org/chip";

type Colors = "default" | "warning" | "primary" | "success" | "danger";

const RideStatus = ({ status }: { status: string }) => {
  let color: Colors = "default";
  switch (status) {
    case "pendiente":
      color = "warning";
      break;
    case "iniciado":
      color = "primary";
      break;
    case "terminado":
      color = "success";
      break;
    case "cancelado":
      color = "danger";
      break;
    default:
      color = "default";
      break;
  }
  return (
    <Chip variant="flat" color={color} className="uppercase font-medium">
      {status}
    </Chip>
  );
};

export default RideStatus;
