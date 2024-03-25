"use client";

import { finishRide } from "@/lib/actions/rides";
import { StopIcon } from "@heroicons/react/16/solid";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from "react";

const FinishRideButton = ({ id }: { id: number }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const handleBegin = async () => {
    finishRide(id).then(() => {
      setIsLoading(false);
      onClose();
    });
  };
  return (
    <>
      <Button
        color="warning"
        size="sm"
        isLoading={isLoading}
        startContent={<StopIcon className="h-1/2" />}
        onPress={onOpen}
      >
        Terminar viaje
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>¿Estás seguro de terminar el viaje?</ModalHeader>
              <ModalBody>
                ¡Gracias por continuar apoyando a la comunidad universitaria!
              </ModalBody>
              <ModalFooter className="flex flex-row gap-8 justify-between">
                <Button color="primary" onClick={handleBegin}>
                  Sí
                </Button>{" "}
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

export default FinishRideButton;
