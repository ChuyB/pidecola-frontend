"use client";

import { reviewRide } from "@/lib/actions/rides";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
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

export const ReviewRideButton = ({ id }: { id: number }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [reviewText, setReviewText] = useState<"like" | "dislike">("like");

  const openModal = (review: "like" | "dislike") => {
    setReviewText(review);
    onOpen();
  };

  const handleReview = (review: "like" | "dislike") => {
    setIsLoading(true);
    reviewRide(id, review).then(() => {
      setIsLoading(false);
      onClose();
    });
  };

  return (
    <>
      <div className="flex gap-4 items-center">
        <p className="text-sm text-bold uppercase text-gray-500">Valoración:</p>
        <Button
          color="success"
          size="sm"
          isLoading={isLoading}
          onPress={() => openModal("like")}
          isIconOnly
        >
          <HandThumbUpIcon className="w-1/2 text-white" />
        </Button>
        <Button
          color="danger"
          size="sm"
          isLoading={isLoading}
          onPress={() => openModal("dislike")}
          isIconOnly
        >
          <HandThumbDownIcon className="w-1/2 text-white" />
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Valorar conductor</ModalHeader>
              <ModalBody>
                <p>
                  ¿Estás seguro de valorar
                  {reviewText === "like" ? " positivamente " : " negativamente "}
                  este conductor?
                </p>
              </ModalBody>
              <ModalFooter className="flex flex-row gap-8 justify-between">
                <Button
                  color="primary"
                  onClick={() => handleReview(reviewText)}
                >
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
