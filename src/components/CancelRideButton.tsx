"use client";

import { cancelRide } from "@/lib/actions/rides";
import { XCircleIcon } from "@heroicons/react/16/solid";
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

const CancelRideButton = ({ id }: { id: number }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const handleCancel = async () => {
    cancelRide(id).then(() => {
      setIsLoading(false);
      onClose();
    });
  };
  return (
    <>
      <Button
        color="danger"
        size="sm"
        isLoading={isLoading}
        startContent={<XCircleIcon className="h-1/2" />}
        onPress={onOpen}
      >
        Cancelar solicitud
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>¿Deseas cancelar la cola?</ModalHeader>
              <ModalBody>
                Una vez que la canceles, tienes que solicitar una nueva cola
              </ModalBody>
              <ModalFooter className="flex flex-row gap-8 justify-between">
                <Button color="primary" onClick={handleCancel}>
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

export default CancelRideButton;
