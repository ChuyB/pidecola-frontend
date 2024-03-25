import { useEffect } from "react";
import { RideRequest } from "@/lib/types/rides.type";
import RideCard from "@/components/OfferSeats/RideCard";
import { getAllRides } from "@/lib/actions/rides";
import { useOfferSeatsContext } from "./OfferSeatsProvider";

const AvailableRides = () => {
  const [state, dispatch] = useOfferSeatsContext();

  const onSelect = (id: number) => {
    const rides = state.availableRides;
    if (state.selectedRides.length >= state.vehicle.seats) return;

    dispatch({
      type: "SET_SELECTED_RIDES",
      data: [
        ...state.selectedRides,
        rides.find((ride: RideRequest) => ride.id === id),
      ],
    });
    const updatedRides = rides.filter((ride: RideRequest) => ride.id !== id);
    dispatch({ type: "SET_AVAILABLE_RIDES", data: updatedRides });
  };

  // Get rides
  useEffect(() => {
    const fetchRides = async () => {
      const fetchedRides = await getAllRides(
        state.route?.origin,
        state.route?.destination,
      );
      if (fetchedRides)
        dispatch({ type: "SET_AVAILABLE_RIDES", data: fetchedRides });
    };

    fetchRides();
  }, [dispatch, state.route?.destination, state.route?.origin, state.stage]);

  return (
    <section className="min-h-[600px] w-full max-w-lg md:max-w-3xl lg:max-w-4xl mt-8 animate-fade-up">
      <h1 className="font-bold text-3xl">Colas solicitadas</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {state.availableRides.length === 0 ? (
          <p className="text-lg text-gray-500 col-span-full">
            Parece que no hay compañeros que hayan solicitado colas aún
          </p>
        ) : (
          state.availableRides.map((ride: RideRequest) => (
            <RideCard
              key={ride.id}
              id={ride.id}
              name={`${ride.user.first_name} ${ride.user.last_name}`}
              from={ride.origin}
              to={ride.destination}
              time={ride.timestamp}
              onSelect={onSelect}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default AvailableRides;
