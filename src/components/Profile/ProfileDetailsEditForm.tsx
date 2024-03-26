"use client";
import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  Tooltip,
} from "@nextui-org/react";
import { User } from "@/lib/types/user.type";
import { editInformationSchema } from "@/lib/validations/userSchema";
import { useFormState, useFormStatus } from "react-dom";
import { PencilIcon } from "@heroicons/react/24/outline";
import { patchUserInfo } from "@/lib/actions/users";

function clean_form_data(data: { [k: string]: FormDataEntryValue }): {
  [k: string]: string;
} {
  const clean_data: { [k: string]: string } = {};
  for (let field in data) {
    const clean_field = (data[field] as string).trim();
    if (clean_field !== "") {
      clean_data[field] = clean_field;
    }
  }
  return clean_data;
}

export default function ProfileDetailsEditForm({
  userData,
}: {
  userData: User;
}) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [formErrors, setFormErrors] = useState<any>(null);
  const [resStatus, dispatch] = useFormState(patchUserInfo, undefined);
  const [phoneNumber, setPhoneNumber] = useState("");

  const submitAction = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const validationResponse = editInformationSchema.safeParse(data);
    if (!validationResponse.success) {
      setFormErrors(validationResponse.error.formErrors.fieldErrors);
      return;
    }
    setFormErrors(null);
    dispatch(clean_form_data(data));
    onClose();
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputNumber = e.target.value;
    const limitedNumber = inputNumber.slice(0, 12);
    const cleanedNumber = limitedNumber.replace(/-/g, "").replace(/\D/g, "");
    const areaCode = cleanedNumber.slice(0, 4);
    const mainNumber = cleanedNumber.slice(4);
    if (mainNumber) {
      const formattedNumber = `${areaCode}-${mainNumber}`;
      setPhoneNumber(formattedNumber);
      return;
    }

    setPhoneNumber(areaCode);
  };

  return (
    <div className="absolute top-2 right-2">
      <Tooltip content="Editar">
        <Button isIconOnly variant="light" onPress={onOpen}>
          <PencilIcon className="h-1/2" />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        {resStatus?.status === 500 && (
          <p className="text-danger">Ha ocurrido un error</p>
        )}
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
              Editar información
            </ModalHeader>
            <ModalBody>
              <form
                className="flex flex-col items-center gap-4"
                action={submitAction}
              >
                <Input
                  name="first_name"
                  type="text"
                  label="Nombre"
                  labelPlacement="outside"
                  placeholder={userData.first_name}
                  variant="faded"
                  isInvalid={formErrors?.first_name}
                  errorMessage={
                    formErrors?.first_name ? formErrors.first_name[0] : ""
                  }
                />
                <Input
                  name="last_name"
                  type="text"
                  label="Apellido"
                  labelPlacement="outside"
                  placeholder={userData.last_name}
                  variant="faded"
                  isInvalid={formErrors?.lastNameErrInfo}
                  errorMessage={
                    formErrors?.last_name ? formErrors.last_name[0] : ""
                  }
                />
                <Input
                  name="phone_number"
                  type="text"
                  label="Número de teléfono"
                  labelPlacement="outside"
                  placeholder={userData.phone_number}
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  variant="faded"
                  isInvalid={formErrors?.phone_number}
                  errorMessage={
                    formErrors?.phone_number ? formErrors.phone_number[0] : ""
                  }
                />
                <SaveChangesButton />
              </form>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </div>
  );
}

const SaveChangesButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      isLoading={pending}
      className="mt-10"
      color="primary"
      variant="shadow"
      type="submit"
    >
      Guardar cambios
    </Button>
  );
};
