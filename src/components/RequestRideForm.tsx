"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  RadioGroup,
  Radio,
} from "@nextui-org/react";
import { getRoutes, requestRide } from "@/lib/actions/rides";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

const RequestRideForm = () => {
  const [routes, setRoutes] = useState([]);
  const [formResponse, dispatch] = useFormState(requestRide, undefined);
  const [errorNumber, setErrorNumber] = useState<number | undefined>();

  const submitAction = async (formData: FormData) => {
    const data = Object.fromEntries(formData);
    dispatch(formData);
  };

  useEffect(() => {
    const fetchRoutes = async () => {
      const fetchedRoutes = await getRoutes();
      setRoutes(fetchedRoutes);
    };

    fetchRoutes();
  }, []);

  useEffect(() => {
    if (formResponse?.status) setErrorNumber(formResponse.status);
  }, [formResponse]);

  return (
    <div className="z-10 mt-24 lg:mt-32 p-6 w-full max-w-sm sm:max-w-md md:max-w-lg">
      <h1 className="mb-12 dark:text-slate-300 text-2xl font-bold text-center">
        ¡Pide tu cola!
      </h1>
      {errorNumber && errorNumber !== 201 ? (
        <p className="text-danger text-center mb-6">¡Ooops! Ha ocurrido un error</p>
      ) : (
        ""
      )}
      <form className="flex flex-col gap-8 items-center" action={submitAction}>
        <RadioGroup
          isRequired
          name="usb"
          label="¿Vas hacia o desde la USB?"
          defaultValue="to"
          color="primary"
          className="w-full"
        >
          <Radio value="to">Hacia la USB</Radio>
          <Radio value="from">Desde la USB</Radio>
        </RadioGroup>
        <Autocomplete
          isRequired
          name="routeName"
          label="Selecciona tu ruta"
          placeholder="Baruta, Bellas Artes..."
          labelPlacement="outside"
        >
          {routes.map((route: { id: number; name: string }) => (
            <AutocompleteItem key={route.id}>{route.name}</AutocompleteItem>
          ))}
        </Autocomplete>
        <Button type="submit" color="primary">
          Pedir Cola
        </Button>
      </form>
    </div>
  );
};

export default RequestRideForm;
