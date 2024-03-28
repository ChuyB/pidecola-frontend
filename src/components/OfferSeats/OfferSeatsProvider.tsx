import { createContext, useContext, useReducer } from "react";

const OfferSeatsContext = createContext<any>([]);

export const useOfferSeatsContext = () => {
  return useContext(OfferSeatsContext);
};

const reducer = (state: Object, action: { type: string; data: Object }) => {
  switch (action.type) {
    case "SET_STAGE":
      return { ...state, stage: action.data };
    case "SET_VEHICLE":
      return { ...state, vehicle: { ...action.data } };
    case "SET_ROUTE":
      return { ...state, route: { ...action.data } };
    case "SET_AVAILABLE_RIDES":
      return { ...state, availableRides: action.data };
    case "SET_SELECTED_RIDES":
      return { ...state, selectedRides: action.data };
  }
  return state;
};

const OfferSeatsProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    stage: 1,
    selectedRides: [],
    availableRides: [],
  });
  return (
    <OfferSeatsContext.Provider value={[state, dispatch]}>
      {children}
    </OfferSeatsContext.Provider>
  );
};

export default OfferSeatsProvider;
