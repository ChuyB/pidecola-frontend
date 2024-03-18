"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { registerUser } from "@/lib/actions/users";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { registerSchema } from "@/lib/validations/userSchema";

const RegisterForm = () => {
  const router = useRouter();
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const [isVisibleConfirmation, setIsVisibleConfirmation] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstNameErrInfo, setFirstNameErrInfo] = useState("");
  const [lastNameErrInfo, setLastNameErrInfo] = useState("");
  const [emailErrInfo, setEmailErrInfo] = useState("");
  const [phoneErrInfo, setPhoneErrInfo] = useState("");
  const [passErrInfo, setPassErrInfo] = useState("");
  const [confPassErrInfo, setConfPassErrInfo] = useState("");
  const [resMessage, dispatch] = useFormState(registerUser, undefined);

  // Handle submit
  const submitAction = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const validationResponse = registerSchema.safeParse(data);
    if (!validationResponse.success) {
      const { fieldErrors } = validationResponse.error.formErrors;
      const {
        first_name,
        last_name,
        email,
        phoneNumber,
        password,
        confirmPass,
      } = fieldErrors;
      setFirstNameErrInfo(first_name?.[0] || "");
      setLastNameErrInfo(last_name?.[0] || "");
      setEmailErrInfo(email?.[0] || "");
      setPhoneErrInfo(phoneNumber?.[0] || "");
      setPassErrInfo(password?.[0] || "");
      setConfPassErrInfo(confirmPass?.[0] || "");
      return;
    }
    setFirstNameErrInfo("");
    setLastNameErrInfo("");
    setEmailErrInfo("");
    setPhoneErrInfo("");
    setPassErrInfo("");
    setConfPassErrInfo("");

    dispatch(formData);
  };

  useEffect(() => {
    if (resMessage?.status === 400)
      setEmailErrInfo(resMessage?.message[0]);
  }, [resMessage]);

  // Redirect if login was successful
  if (resMessage?.status === 201) router.push("/home");

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputNumber = e.target.value;
    const limitedNumber = inputNumber.slice(0,12)
    const cleanedNumber = limitedNumber.replace(/-/g, "").replace(/\D/g,"");
    const areaCode = cleanedNumber.slice(0, 4);
    const mainNumber = cleanedNumber.slice(4);
    if (mainNumber) {
      const formattedNumber = `${areaCode}-${mainNumber}`;
      setPhoneNumber(formattedNumber);
      return;
    }

    setPhoneNumber(areaCode);
  };

  const togglePassVisibility = () => {
    setIsVisiblePass(!isVisiblePass);
  };

  const toggleConfVisibility = () => {
    setIsVisibleConfirmation(!isVisibleConfirmation);
  };

  return (
    <div className="z-10 bg-slate-200/80 backdrop-blur-lg dark:bg-slate-800 md:shadow-lg dark:shadow-gray-900 rounded-xl p-6 w-full max-w-sm sm:max-w-md md:max-w-lg">
      <h1 className="mb-12 dark:text-slate-300 text-2xl text-center ">
        Regístrate
      </h1>

      <form className="flex flex-col items-center" action={submitAction}>
        <div className="flex flex-row w-full gap-4 mb-4">
          <Input
            isRequired
            name="first_name"
            type="text"
            label="Nombre"
            labelPlacement="outside"
            placeholder="Ingresa tu nombre"
            variant="faded"
            isInvalid={firstNameErrInfo !== ""}
            errorMessage={firstNameErrInfo}
          />
          <Input
            isRequired
            name="last_name"
            type="text"
            label="Apellido"
            labelPlacement="outside"
            placeholder="Ingresa tu appellido"
            variant="faded"
            isInvalid={lastNameErrInfo !== ""}
            errorMessage={lastNameErrInfo}
          />
        </div>
        <Input
          isRequired
          name="email"
          type="email"
          label="Email"
          labelPlacement="outside"
          placeholder="xx-xxxxxxx@usb.ve"
          description="Ingresa tu correo USB"
          className="mb-4"
          variant="faded"
          isInvalid={emailErrInfo !== ""}
          errorMessage={emailErrInfo}
        />

        <Input
          isRequired
          name="phoneNumber"
          type="text"
          label="Número de teléfono"
          labelPlacement="outside"
          placeholder="Ingresa tu número telefónico"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          className="mb-4"
          variant="faded"
          isInvalid={phoneErrInfo !== ""}
          errorMessage={phoneErrInfo}
        />
        <Input
          isRequired
          name="password"
          label="Contraseña"
          labelPlacement="outside"
          placeholder="Ingresa tu contraseña"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={togglePassVisibility}
            >
              {isVisiblePass ? <EyeIcon /> : <EyeSlashIcon />}
            </button>
          }
          type={isVisiblePass ? "text" : "password"}
          className="mb-4"
          variant="faded"
          isInvalid={passErrInfo !== ""}
          errorMessage={passErrInfo}
        />

        <Input
          isRequired
          name="confirmPass"
          label="Confirma tu contraseña"
          labelPlacement="outside"
          placeholder="Vuelve a ingresar tu contraseña"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleConfVisibility}
            >
              {isVisiblePass ? <EyeIcon /> : <EyeSlashIcon />}
            </button>
          }
          type={isVisiblePass ? "text" : "password"}
          className="mb-4"
          variant="faded"
          isInvalid={confPassErrInfo !== ""}
          errorMessage={confPassErrInfo}
        />
        <RegisterButton />
      </form>

      <p className="mt-4 text-sm text-gray-600 text-center">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/login" className="text-blue-500">
          Inicia sesión
        </Link>
      </p>
    </div>
  );
};

const RegisterButton = () => {
  const { pending } = useFormStatus();
  return pending ? (
    <Button
      isLoading
      className="w-min mt-10 mb-4"
      color="default"
      variant="shadow"
    >
      Crear cuenta
    </Button>
  ) : (
    <Button
      type="submit"
      className="w-min mt-10 mb-4"
      color="primary"
      variant="shadow"
    >
      Crear cuenta
    </Button>
  );
};

export default RegisterForm;
