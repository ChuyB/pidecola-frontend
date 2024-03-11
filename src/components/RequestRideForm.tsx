"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  RadioGroup,
  Radio,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useDisclosure,
} from "@nextui-org/react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <>
            <ModalHeader className="dark:text-slate-300 text-2xl font-bold">
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
                id="request_ride"
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
                <RegisterButton onClose={onClose} />
              </form>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

const RegisterButton = ({ onClose }: { onClose: () => void }) => {
  const { pending } = useFormStatus();
  return (
    <Popover backdrop="opaque">
      <PopoverTrigger>
        <Button
          isLoading={pending}
          className="w-min mt-10 mb-4"
          color="primary"
          variant="shadow"
        >
          Pedir cola
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-8 justify-center items-center w-min p-4">
        <h1 className="text-bold text-md">¿Estás seguro que deseas pedir esta cola?</h1>
        <div className="flex flex-row gap-8 w-full justify-between">
          <Button
            isLoading={pending}
            color="primary"
            type="submit"
            form="request_ride"
            size="sm"
          >
            Sí
          </Button>
          <Button
            color="danger"
            onClick={onClose}
            size="sm"
          >
            No
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default RequestRideForm;
