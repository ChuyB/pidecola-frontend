"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  Select,
  SelectItem
} from "@nextui-org/react";
import { FlagIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Input } from "@nextui-org/input";
import { reportUser } from "@/lib/actions/rides";

export const ReportButton = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [coment, setComent] = useState("");
  const [report, setReport] = useState("");
  const denuncias = ["Acoso", "Agresion Verbal", "Agresion Fisica"];

  const handleReport = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReport(e.target.value);
  };

  const handleComent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComent(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    reportUser(report, coment);

  }

  return(
    <>
      <div>
        <Button onPress={onOpen} color="warning" variant="light" size="sm">
          <FlagIcon className="text-yellow-500" />
        </Button>
        <Modal isOpen = {isOpen} onOpenChange={onOpenChange} placement="top-center">
          <ModalContent>
            <ModalHeader className="text-center justify-center font-bold">
              Reporte de Usuario
            </ModalHeader>
            <ModalBody>
              <form onSubmit={handleFormSubmit}>
                <Select
                value={report}
                onChange={handleReport}
                placeholder="Escoja su tipo de denuncia"
                size="md"
                label= "Tipo de denuncia: "
                labelPlacement="outside"
                className="w-full font-bold mb-12">
                  {denuncias.map((denuncia)=>(
                    <SelectItem key={denuncia} value={denuncia}>
                      {denuncia}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                type="textarea"
                value={coment}
                label = "Comentario: "
                labelPlacement="outside"
                placeholder="¿Por qué reportará al conductor?"
                onChange={handleComent}
                className="font-bold mb-4"
                />
                <div className="flex items-center justify-center">
                <Button color="warning" type="submit" onPress={onClose}>
                  Reportar
                </Button>
                </div>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>   
    </>
  );
}