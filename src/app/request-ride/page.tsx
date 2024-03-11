import ActiveRideSection from "@/sections/ActiveRideSection";
import { Skeleton } from "@nextui-org/react";
import { Suspense } from "react";

export default function RequestRide() {
  return (
    <div className="w-full flex flex-grow items-center justify-center">
      <Suspense fallback={<Skeleton className="w-full rounded" />}>
        <ActiveRideSection />
      </Suspense>
    </div>
  )
}
