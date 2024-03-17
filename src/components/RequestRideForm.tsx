"use client";

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  RadioGroup,
  Radio,
  useDisclosure,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { getRoutes, requestRide } from "@/lib/actions/rides";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { rideRequestSchema } from "@/lib/validations/rideSchema";

const RequestRideForm = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [formResponse, dispatch] = useFormState(requestRide, undefined);
  const [routes, setRoutes] = useState([]);
  const [errorNumber, setErrorNumber] = useState<number | undefined>();
  const [usbErrInfo, setUsbErrInfo] = useState("");
  const [routeNameErrInfo, setRouteNameErrInfo] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const submitAction = async (
    formData: FormData,
    isConfirmed: boolean = false,
  ) => {
    if (isConfirmed) {
      setShowConfirmation(false);
      dispatch(formData);
      return;
    }
    const data = Object.fromEntries(formData);
    const validationResponse = rideRequestSchema.safeParse(data);
    if (!validationResponse.success) {
      const { fieldErrors } = validationResponse.error.formErrors;
      const { usb, routeName } = fieldErrors;
      setUsbErrInfo(usb?.[0] || "");
      setRouteNameErrInfo(routeName?.[0] || "");
    } else {
      setUsbErrInfo("");
      setRouteNameErrInfo("");
    }

    setShowConfirmation(true);
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
  }, [formResponse, onClose]);

  return (
    <div>
      <Button color="primary" onPress={onOpen}>
        ¡Pide tu cola!
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          <div
            className={
              showConfirmation
                ? "animate-fade-down animate-duration-[400ms] animate-alternate-reverse -z-10"
                : "visible"
            }
          >
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
                id="requestRideForm"
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
                  isInvalid={usbErrInfo !== ""}
                  errorMessage={usbErrInfo}
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
                  isInvalid={routeNameErrInfo !== ""}
                  errorMessage={routeNameErrInfo}
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
          </div>
          <div
            className={`${showConfirmation ? "visible animate-fade-up" : "hidden"
              } absolute inset-0 m-auto h-min`}
          >
            <ModalHeader>¿Quieres solicitar esta cola?</ModalHeader>
            <ModalBody>Revisa bien antes de enviar la solicitud</ModalBody>
            <ModalFooter className="flex flex-row justify-between">
              <Button
                color="primary"
                type="submit"
                form="requestRideForm"
                formAction={(formData: FormData) => {
                  submitAction(formData, true);
                }}
              >
                Sí
              </Button>
              <Button
                color="danger"
                onPress={() => {
                  setShowConfirmation(false);
                }}
              >
                No
              </Button>
            </ModalFooter>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};

const RegisterButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      isLoading={pending}
      className="w-min mt-10 mb-4"
      color="primary"
      variant="shadow"
      type="submit"
    >
      Pedir cola
    </Button>
  );
};

export default RequestRideForm;
