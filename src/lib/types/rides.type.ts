export type RideRequestStatus =
  | "aceptado"
  | "iniciado"
  | "finalizado"
  | "cancelado"
  | "pendiente";
export type RideStatus = "finalizado" | "iniciado" | "cancelado" | "pendiente";

export interface Ride {
  id: number;
  created_at: string;
  status: RideStatus;
  driver: number;
  origin: string;
  destination: string;
  passengers: [
    { id: number; first_name: string; last_name: string; phone_number: string },
  ];
}

export interface RideRequest {
  id: number;
  timestamp: string;
  status: RideRequestStatus;
  user: {
    id: number;
    first_name: string;
    last_name: string;
  };
  origin: string;
  destination: string;
  driver: {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: number;
  };
  is_reviewed: boolean;
}
