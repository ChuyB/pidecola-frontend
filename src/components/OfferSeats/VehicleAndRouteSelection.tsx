import { useEffect, useState } from "react";
import { FieldValues, useForm, Controller } from "react-hook-form";
import { ArrowRightIcon } from "@heroicons/react/16/solid";
import { UsersIcon } from "@heroicons/react/24/outline";
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useOfferSeatsContext } from "./OfferSeatsProvider";
import { getUserVehicles } from "@/lib/actions/users";
import { getRoutes } from "@/lib/actions/rides";
import { Route } from "@/lib/types/route.type";
import { Vehicle } from "@/lib/types/vehicle.type";

const VehicleAndRouteSelection = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [, dispatch] = useOfferSeatsContext();
  const { register, handleSubmit, control } = useForm();

  const onSubmit = (values: FieldValues) => {
    const vehicle = vehicles.find(
      (vehicle) => vehicle.id === parseInt(values.vehicle),
    );
    let origin = values.usb === "from" ? "USB" : values.routeName;
    let destination = values.usb === "to" ? "USB" : values.routeName;

    // Sets vehicle to selected vehicle
    dispatch({
      type: "SET_VEHICLE",
      data: vehicle,
    });

    // Sets route to selected route
    dispatch({
      type: "SET_ROUTE",
      data: {
        origin,
        destination,
      },
    });

    // Changes stage to selectRides
    dispatch({
      type: "SET_STAGE",
      data: 2,
    });
  };

  // Gets vehicles and routes
  useEffect(() => {
    getUserVehicles().then((data) => data && setVehicles(data));
    getRoutes().then((data) => data && setRoutes(data));
  }, []);

  return (
    <form
      id="requestRideForm"
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-8 items-center"
    >
      <Select
        label="Vehículo"
        labelPlacement="outside"
        placeholder="Selecciona un vehículo"
        isRequired
        {...register("vehicle")}
      >
        {vehicles.map((vehicle) => (
          <SelectItem
            key={vehicle.id}
            value={vehicle.id}
            endContent={
              <span className="flex gap-1">
                {vehicle.seats}
                <UsersIcon className="h-5 inline" />
              </span>
            }
          >
            {`${vehicle.brand} ${vehicle.model}`}
          </SelectItem>
        ))}
      </Select>
      <Controller
        name="usb"
        control={control}
        defaultValue="to"
        render={({ field }) => (
          <RadioGroup
            isRequired
            label="¿Vas hacia o desde la USB?"
            defaultValue="to"
            color="primary"
            className="w-full"
            {...field}
            // isInvalid={usbErrInfo !== ""}
            // errorMessage={usbErrInfo}
          >
            <Radio key="to" value="to">
              Hacia la USB
            </Radio>
            <Radio key="from" value="from">
              Desde la USB
            </Radio>
          </RadioGroup>
        )}
      />
      <Autocomplete
        isRequired
        label="Selecciona tu ruta"
        placeholder="Baruta, Bellas Artes..."
        labelPlacement="outside"
        // isInvalid={routeNameErrInfo !== ""}
        // errorMessage={routeNameErrInfo}
        {...register("routeName")}
      >
        {routes.map((route) => (
          <AutocompleteItem key={route.name}>{route.name}</AutocompleteItem>
        ))}
      </Autocomplete>

      <Button
        className="w-min mt-10 mb-4"
        color="primary"
        variant="shadow"
        endContent={<ArrowRightIcon className="h-1/2" />}
        type="submit"
      >
        Buscar pasajeros
      </Button>
    </form>
  );
};

export default VehicleAndRouteSelection;
