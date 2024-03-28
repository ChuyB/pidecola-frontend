"use client";

import { CheckIcon } from "@heroicons/react/16/solid";
import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useOfferSeatsContext } from "./OfferSeatsProvider";
import { RideRequest } from "@/lib/types/rides.type";
import { createNewRide } from "@/lib/actions/rides";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";

const RideSelection = () => {
  const [state, dispatch] = useOfferSeatsContext();
  const [formResponse, dispatchForm] = useFormState(createNewRide, undefined);
  const { pending } = useFormStatus();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const removeRide = (id: number) => {
    const updatedSelectedRides = state.selectedRides.filter(
      (ride: RideRequest) => ride.id !== id,
    );
    const updatedAvailabelRides = [
      ...state.availableRides,
      state.selectedRides.find((ride: RideRequest) => ride.id === id),
    ];
    dispatch({ type: "SET_AVAILABLE_RIDES", data: updatedAvailabelRides });
    dispatch({ type: "SET_SELECTED_RIDES", data: updatedSelectedRides });
  };

  return (
    <>
      <form
        id="rideSelectionForm"
        className="flex flex-col gap-8 items-center"
        action={(formData: FormData) => {
          onClose();
          dispatchForm(formData);
        }}
      >
        <input type="hidden" name="origin" value={state.route.origin} />
        <input
          type="hidden"
          name="destination"
          value={state.route.destination}
        />
        <input
          type="hidden"
          name="requests"
          value={state.selectedRides.map((ride: RideRequest) => ride.id)}
        />
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <h2 className="text-lg">
              Pasajeros<span className="text-danger">*</span>
            </h2>
            <Chip
              variant="bordered"
              color={
                state.selectedRides.length === state.vehicle.seats
                  ? "warning"
                  : "primary"
              }
            >
              {`${state.selectedRides.length}/${state.vehicle.seats} puestos disponibles`}
            </Chip>
          </div>
          {state.selectedRides.length === 0 ? (
            <p className="w-full text-left text-gray-400">
              Agrega a personas a quienes quieras darle la cola
            </p>
          ) : (
            state.selectedRides.map((ride: RideRequest) => (
              <Chip
                key={ride.timestamp}
                color="warning"
                size="lg"
                onClose={() => removeRide(ride.id)}
              >{`${ride.user.first_name} ${ride.user.last_name}`}</Chip>
            ))
          )}
        </div>
        <Button
          isDisabled={state.selectedRides.length === 0}
          className="w-min mt-10 mb-4"
          color="primary"
          variant="shadow"
          isLoading={pending}
          onClick={onOpen}
        >
          Aceptar colas
        </Button>
      </form>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>¿Deseas aceptar esta cola?</ModalHeader>
              <ModalBody>
                Una vez que la aceptes, tienes que buscar a tus pasajeros y
                comenzar el viaje
              </ModalBody>
              <ModalFooter className="flex flex-row gap-8 justify-between">
                <Button color="primary" type="submit" form="rideSelectionForm">
                  Sí
                </Button>
                <Button color="danger" onClick={onClose}>
                  No
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default RideSelection;
