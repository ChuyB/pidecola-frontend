"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { PlusIcon } from "@heroicons/react/16/solid";
import { Vehicle } from "@/lib/types/vehicle.type";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const iconClasses = "pointer-events-none w-5";

const columns = [
  {
    key: "brand",
    label: "Marca",
  },
  {
    key: "model",
    label: "Modelo",
  },
  {
    key: "seats",
    label: "Asientos",
  },
  {
    key: "color",
    label: "Color",
  },
  {
    key: "plate",
    label: "Placa",
  },
];

const UserVehiclesTable = ({ vehicles }: { vehicles: Vehicle[] }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/vehicles-register");
  };

  return (
    <div className="h-full flex flex-col gap-8 justify-between items-center ">
      <Table aria-label="Tabla de tus vehículos">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={vehicles}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Button
        color="primary"
        startContent={<PlusIcon className={iconClasses} />}
        onClick={handleClick}
      >
        Añadir Vehículo
      </Button>
    </div>
  );
};

export default UserVehiclesTable;
