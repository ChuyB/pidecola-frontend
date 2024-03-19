"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { registerUser } from "@/lib/actions/users";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { registerVehicleSchema } from "@/lib/validations/userSchema";

const RegisterVehicleForm = () => {
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [seats, setSeats] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [resMessage, dispatch] = useFormState(registerUser, undefined);

  // Handle submit
  const submitAction = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const validationResponse = registerVehicleSchema.safeParse(data);
    if (!validationResponse.success) {
      const { fieldErrors } = validationResponse.error.formErrors;
      const {
        brand,
        model,
        seats,
        color,
        plate,
      } = fieldErrors;
      setBrand(brand?.[0] || "");
      setModel(model?.[0] || "");
      setSeats(seats?.[0] || "");
      setColor(color?.[0] || "");
      setPlate(plate?.[0] || "");
      return;
    }
    setBrand("");
    setModel("");
    setSeats("");
    setColor("");
    setPlate("");

    dispatch(formData);
  };

  useEffect(() => {
    if (resMessage?.status === 400)
      setSeats(resMessage?.message[0]);
  }, [resMessage]);

  // Redirect if register was successful
  if (resMessage?.status === 201) router.push("/vehicles");

  return (
    <div className="z-10 bg-slate-200/80 backdrop-blur-lg dark:bg-slate-800 md:shadow-lg dark:shadow-gray-900 rounded-xl p-6 w-full max-w-sm sm:max-w-md md:max-w-lg">
      <h1 className="mb-12 dark:text-slate-300 text-2xl text-center ">
        Registra tu vehículo
      </h1>

      <form className="flex flex-col items-center" action={submitAction}>
        <div className="flex flex-row w-full gap-4 mb-4">
          <Input
            isRequired
            name="brand"
            type="text"
            label="Marca"
            labelPlacement="outside"
            placeholder="Ingresa la marca del vehículo"
            variant="faded"
            isInvalid={brand !== ""}
            errorMessage={brand}
          />
          <Input
            isRequired
            name="model"
            type="text"
            label="Modelo"
            labelPlacement="outside"
            placeholder="Ingresa el modelo del vehículo"
            variant="faded"
            isInvalid={model !== ""}
            errorMessage={model}
          />
        </div>
        <Input
          isRequired
          name="seats"
          type="number"
          label="Asientos"
          labelPlacement="outside"
          placeholder="Ingrese la cantidad de asientos"
          className="mb-4"
          variant="faded"
          isInvalid={seats !== ""}
          errorMessage={seats}
        />

        <Input
          isRequired
          name="color"
          type="text"
          label="Color"
          labelPlacement="outside"
          placeholder="Ingresa el color del vehículo"
          className="mb-4"
          variant="faded"
          isInvalid={color !== ""}
          errorMessage={color}
        />
        <Input
            isRequired
            name="plate"
            type="text"
            label="Placa"
            labelPlacement="outside"
            placeholder="Ingresa la placa del vehículo"
            variant="faded"
            isInvalid={plate !== ""}
            errorMessage={plate}
        />
        <RegisterVehicleButton />
      </form>
    </div>
  );
};

const RegisterVehicleButton = () => {
  const { pending } = useFormStatus();
  return pending ? (
    <Button
      isLoading
      className="w-min mt-10 mb-4"
      color="default"
      variant="shadow"
    >
      Registrar Vehículo
    </Button>
  ) : (
    <Button
      type="submit"
      className="w-min mt-10 mb-4"
      color="primary"
      variant="shadow"
    >
      Registrar Vehículo
    </Button>
  );
};

export default RegisterVehicleForm;
