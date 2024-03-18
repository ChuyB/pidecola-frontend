"use client";

import { useEffect, useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { loginUser } from "@/lib/actions/users";
import { useFormState, useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/lib/validations/userSchema";

const LoginForm = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [resMessage, dispatch] = useFormState(loginUser, undefined);
  const [emailErrInfo, setEmailErrInfo] = useState("");
  const [passErrInfo, setPassErrInfo] = useState("");

  const submitAction = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const validationResponse = loginSchema.safeParse(data);
    if (!validationResponse.success) {
      const { fieldErrors } = validationResponse.error.formErrors;
      const { email, password } = fieldErrors;
      setEmailErrInfo(email?.[0] || "");
      setPassErrInfo(password?.[0] || "");
      return;
    }
    setEmailErrInfo("");
    setPassErrInfo("");

    dispatch(formData);
  };

  useEffect(() => {
    if (resMessage?.status === 401) {
      setEmailErrInfo("Ingresa tu correo USB");
      setPassErrInfo(" ");
    }
  }, [resMessage]);

  // Redirect if login was successful
  if (resMessage?.status === 200) router.push("/home");

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="z-10 bg-slate-200/80 backdrop-blur-lg dark:bg-slate-800 md:shadow-lg dark:shadow-gray-900 rounded-xl p-6 w-full max-w-sm sm:max-w-md md:max-w-lg">
      <h1 className="mb-12 dark:text-slate-300 text-2xl text-center ">
        Iniciar sesión
      </h1>

      {resMessage?.status === 401 ? (
        <p className="text-danger text-center mb-6">
          El usuario o la contraseña no son correctas
        </p>
      ) : (
        ""
      )}

      <form className="flex flex-col items-center" action={submitAction}>
        <Input
          isRequired
          type="email"
          label="Email"
          name="email"
          labelPlacement="outside"
          placeholder="xx-xxxxxxx@usb.ve"
          description="Ingresa tu correo USB"
          className="mb-8"
          variant="faded"
          isInvalid={emailErrInfo !== ""}
          errorMessage={emailErrInfo}
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
              onClick={toggleVisibility}
            >
              {isVisible ? <EyeIcon /> : <EyeSlashIcon />}
            </button>
          }
          type={isVisible ? "text" : "password"}
          variant="faded"
          isInvalid={passErrInfo !== ""}
          errorMessage={passErrInfo}
        />

        <LoginButton />
      </form>
      <p className="mt-4 text-sm text-gray-600 text-center">
        ¿Aún no estás registrado?{" "}
        <Link href="/register" className="text-blue-500">
          Regístrate
        </Link>
      </p>
    </div>
  );
};

const LoginButton = () => {
  const { pending } = useFormStatus();
  return pending ? (
    <Button
      type="submit"
      isLoading
      className="w-min mt-10 mb-4"
      color="default"
      variant="shadow"
    >
      Iniciar sesión
    </Button>
  ) : (
    <Button
      type="submit"
      className="w-min mt-10 mb-4"
      color="primary"
      variant="shadow"
    >
      Iniciar sesión
    </Button>
  );
};

export default LoginForm;
