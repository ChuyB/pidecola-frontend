import ActiveRideSection from "@/sections/ActiveRideSection";
import { Skeleton } from "@nextui-org/react";
import { Suspense } from "react";

export default function RequestRide() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Suspense fallback={<Skeleton className="w-[400px] h-[200px] rounded-lg mt-10" />}>
        <ActiveRideSection />
      </Suspense>
    </div>
  )
}
