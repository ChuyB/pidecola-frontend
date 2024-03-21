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
  {
    key: "actions",
    label: "Acciones",
  },
];

export default function VehiclesTable({ vehicles }: { vehicles: Vehicle[] }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/vehicles-register");
  };

  return (
    <div className="w-full items-center justify-content ml-5 mr-5">
      <div className="mt-5">
        <Button
          color="primary"
          startContent={<PlusIcon className={iconClasses} />}
          onClick={handleClick}
        >
          Añadir Vehículo
        </Button>
      </div>
      <div className="w-full mt-5">
        <Table aria-label="Vehicles table">
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
      </div>
    </div>
  );
}
