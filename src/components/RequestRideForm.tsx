"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Autocomplete,
  AutocompleteItem,
  Button,
  RadioGroup,
  Radio,
  useDisclosure,
} from "@nextui-org/react";
import { getRoutes, requestRide } from "@/lib/actions/rides";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const RequestRideForm = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
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

    onClose();
  }, [formResponse]);

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        ¡Pide tu cola!
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          <>
            <ModalHeader className="dark:text-slate-300 text-2xl font-bold text-center">
              ¡Pide tu cola!
            </ModalHeader>

            <ModalBody>
              {errorNumber && errorNumber !== 201 ? (
                <p className="text-danger text-center mb-6">
                  ¡Ooops! Ha ocurrido un error
                </p>
              ) : (
                ""
              )}
              <form
                className="flex flex-col gap-8 items-center"
                action={submitAction}
              >
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
                    <AutocompleteItem key={route.id}>
                      {route.name}
                    </AutocompleteItem>
                  ))}
                </Autocomplete>
                <RegisterButton />
              </form>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
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

export default RequestRideForm;
