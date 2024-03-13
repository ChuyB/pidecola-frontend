export type Vehicle = {
  id: number
  brand: string
  model: string
  seats: number
  color: string
  plate: string
  ownwer: string
}

export const columns = [
  {
    key: "brand",
    label: "Marca",
  },
  {
    key: "model",
    label: "Modelo",
  },
  {
    key: "seats",
    label: "Asientos",
  },
  {
    key: "color",
    label: "Color",
  },
  {
    key: "plate",
    label: "Placa",
  },
  {
    key: "actions",
    label: "Acciones",
  }
];