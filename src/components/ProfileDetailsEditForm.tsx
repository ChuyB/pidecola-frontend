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
} from "@nextui-org/react";
import { User, pathUserData } from "@/lib/api/usersApi";
import { editInformationSchema } from "@/lib/validations/userSchema";
import { useFormState, useFormStatus } from "react-dom";

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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  // TODO: Better management of form errors
  const [formErrors, setFormErrors] = useState<any>(null);
  const [resMessage, dispatch] = useFormState(pathUserData, undefined);

  const submitAction = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    const validationResponse = editInformationSchema.safeParse(data);
    if (!validationResponse.success) {
      setFormErrors(validationResponse.error.formErrors.fieldErrors);
      return;
    }
    setFormErrors(null);
    dispatch(clean_form_data(data));
  };

  if (resMessage?.status === 200) {
    window.location.reload();
  }

  return (
    <>
      <Button onPress={onOpen} className="mt-3" size="sm" color="primary">
        Editar información
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Editar información
              </ModalHeader>
              <ModalBody>
                <form
                  className="flex flex-col items-center"
                  action={submitAction}
                >
                  <Input
                    className="mb-4"
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
                    className="mb-4"
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
                  <SaveChangesButton />
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

const SaveChangesButton = () => {
  const { pending } = useFormStatus();
  return pending ? (
    <Button isLoading className="w-min" color="default" variant="shadow">
      Guardar cambios
    </Button>
  ) : (
    <Button type="submit" className="w-min" color="primary" variant="shadow">
      Guardar cambios
    </Button>
  );
};
