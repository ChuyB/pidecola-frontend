"use client"

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue
} from "@nextui-org/react";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon
} from "@heroicons/react/16/solid";
import { Vehicle, columns } from "../app/vehicles/columns"
import {Button, ButtonGroup} from "@nextui-org/react";

const iconClasses = "pointer-events-none w-5";

export default function VehiclesTable({ vehicles }: { vehicles: Vehicle[] }) {
  return (
    <div >
      {/* <Button color="primary" startContent={<PlusIcon className={iconClasses}/>}>
        Añadir Vehículo
      </Button> */}
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={vehicles}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
