export type RideStatus = "completado" | "cancelado" | "pendiente";

export interface Ride {
  id: number;
  timestamp: string;
  status: RideStatus;
  user: {
    id: number
    first_name: string
    last_name: string
  };
  origin: string;
  destination: string;
  ride: null
}
