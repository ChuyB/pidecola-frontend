import { z } from "zod";

const rideRequestSchema = z.object({
  usb: z.enum(["from", "to"], {
    required_error:
      "Es requerido escoger si se va a la universidad o desde la universidad",
  }),
  routeName: z.string({
    required_error: "Es requerido escoger la ruta",
    invalid_type_error: "La ruta no es válida",
  }),
});

export { rideRequestSchema };
