"use client";

import { beginRide } from "@/lib/actions/rides";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
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

const BeginRideButton = ({ id }: { id: number }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const handleBegin = async () => {
    beginRide(id).then(() => {
      setIsLoading(false);
      onClose();
    });
  };
  return (
    <>
      <Button
        color="primary"
        size="sm"
        isLoading={isLoading}
        startContent={<PaperAirplaneIcon className="h-1/2" />}
        onPress={onOpen}
      >
        Comenzar viaje
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>¿Estás seguro de comenzar el viaje?</ModalHeader>
              <ModalBody>
                Recuerda que una vez comenzado, debes terminar el viaje una vez
                llegues a tu destino
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

export default BeginRideButton;
