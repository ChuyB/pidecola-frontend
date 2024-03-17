import RideCard from "@/components/RideCard";
import { getAllRides } from "@/lib/actions/rides";

export const RidesListSection = async () => {
  const rides = await getAllRides();

  return (
    <section className="mt-8 w-full max-w-lg md:max-w-3xl lg:max-w-4xl p-6">
      <h1 className="font-bold text-3xl">Colas solicitadas</h1>
      <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8">
        {rides?.map((ride) => (
          <RideCard
            key={ride.id}
            name={`${ride.user.first_name} ${ride.user.last_name}`}
            from={ride.origin}
            to={ride.destination}
            time={ride.timestamp}
          ></RideCard>
        ))}
      </div>
    </section>
  );
};
