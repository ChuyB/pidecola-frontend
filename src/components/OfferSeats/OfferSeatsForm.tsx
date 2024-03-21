"use client";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";
import { useOfferSeatsContext } from "@/components/OfferSeats/OfferSeatsProvider";
import { useFormStatus } from "react-dom";
import VehicleAndRouteSelection from "./VehicleAndRouteSelection";
import RideSelection from "./RidesSelection";
import AvailableRides from "./AvailableRides";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

const OfferSeatsForm = () => {
  const [state, dispatch] = useOfferSeatsContext();

  const renderTitle = () => {
    switch (state.stage) {
      case 1:
        return "Selecciona tu vehículo y la ruta";
      case 2:
        return "Selecciona las colas";
      default:
        return "¡Lleva a un compañero!";
    }
  };

  const renderFormStage = () => {
    switch (state.stage) {
      case 1:
        return <VehicleAndRouteSelection />;
      case 2:
        return <RideSelection />;
    }
  };

  const goToPreviousStage = () => {
    if (state.stage === 2) {
      // Resets selected rides
      dispatch({ type: "SET_SELECTED_RIDES", data: [] });
    }
    // Go to previous stage
    dispatch({ type: "SET_STAGE", data: state.stage - 1 });
  };

  return (
    <div className="w-full flex flex-col justify-start items-center gap-y-8">
      <Card className="mt-10 w-full max-w-[500px] p-6">
        {state.stage > 1 && (
          <Button isIconOnly variant="light" onClick={goToPreviousStage}>
            <ArrowLeftIcon className="h-1/2" />
          </Button>
        )}
        <CardHeader className="dark:text-slate-300 text-xl font-bold">
          {renderTitle()}
        </CardHeader>

        <CardBody>
          {/*
        {errorNumber && errorNumber !== 201 ? (
          <p className="text-danger text-center mb-6">
            ¡Ooops! Ha ocurrido un error
          </p>
        ) : (
          ""
        )}
        */}
          {renderFormStage()}
        </CardBody>
        {/*
      <div
        className={`${
          showConfirmation ? "visible animate-fade-up" : "hidden"
        } absolute inset-0 m-auto h-min`}
      >
        <CardHeader>¿Quieres solicitar esta cola?</CardHeader>
        <CardBody>Revisa bien antes de enviar la solicitud</CardBody>
        <CardFooter className="flex flex-row justify-between">
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
        </CardFooter>
      </div>
      */}
      </Card>
      {state.stage === 2 &&
        state.selectedRides.length < state.vehicle.seats && <AvailableRides />}
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

export default OfferSeatsForm;
