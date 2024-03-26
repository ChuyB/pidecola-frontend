import { z } from "zod";

const phoneRegex = new RegExp(/^(\d{4}-\d{7})$/);

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "Introduzca una dirección de correo válida" })
    .refine((e) => e.endsWith("@usb.ve"), {
      message: "El correo debe ser el institucional",
    }),
  password: z
    .string()
    .min(4, { message: "Ingresa una contraseña con al menos 4 caracteres" }),
});

const registerSchema = z
  .object({
    first_name: z
      .string()
      .min(1, {
        message: "El nombre debe tener al menos un caracter",
      })
      .refine((e) => /^[A-Za-zÀ-ÿ\u00f1\u00d1\s]+$/.test(e), {
        message:
          "Tines un nombre curioso. Sin embargo, no es permitido colocar números",
      }),
    last_name: z
      .string()
      .min(1, {
        message: "El apellido debe tener al menos un caracter",
      })
      .refine((e) => /^[A-Za-zÀ-ÿ\u00f1\u00d1\s]+$/.test(e), {
        message:
          "Tines un apellido curioso. Sin embargo, no es permitido colocar números",
      }),
    email: z
      .string()
      .email({ message: "Introduzca una dirección de correo válida" })
      .refine((e) => e.endsWith("@usb.ve"), {
        message: "El correo debe ser el institucional",
      }),
    phoneNumber: z
      .string()
      .regex(phoneRegex, "Introduce un número telefónico válido"),
    password: z
      .string()
      .min(4, { message: "Ingresa una contraseña con al menos 4 caracteres" }),
    confirmPass: z
      .string()
      .min(4, { message: "Ingresa una contraseña con al menos 4 caracteres" }),
  })
  .refine(({ password, confirmPass }) => password === confirmPass, {
    message: "Debe ser igual a tu contraseña",
    path: ["confirmPass"],
  });

const registerVehicleSchema = z.object({
  brand: z
    .string()
    .min(1, {
      message: "La marca debe tener al menos un caracter",
    })
    .refine((e) => /^[A-Za-z]+$/.test(e), {
      message:
        "La marca del vehículo no debe contener números, si consideras que es un error comunícate con el administrador",
    }),
  model: z
    .string()
    .min(1, {
      message: "El modelo debe tener al menos un caracter",
    })
    .refine((e) => /^[A-Za-z0-9]+$/.test(e), {
      message:
        "El modelo del vehículo no debe contener caracteres especiales, si consideras que es un error comunícate con el administrador",
    }),
  seats: z
    .string()
    .min(1, {
      message: "El vehículo debe tener al menos un asiento",
    })
    .refine((e) => /^[0-9]+$/.test(e), {
      message: "El número de asientos solo puede ser un número entero",
    }),
  color: z
    .string()
    .min(1, {
      message: "El color debe tener al menos un caracter",
    })
    .refine((e) => /^[A-Za-z]+$/.test(e), {
      message:
        "El color del vehículo no debe contener números, si consideras que es un error comunícate con el administrador",
    }),
  plate: z
    .string()
    .min(1, {
      message: "La placa debe tener al menos un caracter",
    })
    .max(7, {
      message: "La placa no puede tener más de 7 caracteres",
    })
    .refine((e) => /^[A-Za-z0-9]+$/.test(e), {
      message:
        "La placa del vehículo no debe contener caracteres especiales, si consideras que es un error comunícate con el administrador",
    }),
});

const editInformationSchema = z.object({
  first_name: z
    .string()
    .refine((e) => /^$|^[A-Za-zÀ-ÿ\u00f1\u00d1\s]+$/.test(e), {
      message:
        "Tines un nombre curioso. Sin embargo, no es permitido colocar números",
    }),
  last_name: z
    .string()
    .refine((e) => /^$|^[A-Za-zÀ-ÿ\u00f1\u00d1\s]+$/.test(e), {
      message:
        "Tines un apellido curioso. Sin embargo, no es permitido colocar números",
    }),
  phone_number: z.string().refine((e) => /^$|^(\d{4}-\d{7})$/.test(e), {
    message: "Introduce un número telefónico válido",
  }),
});

export {
  loginSchema,
  registerSchema,
  editInformationSchema,
  registerVehicleSchema,
};
