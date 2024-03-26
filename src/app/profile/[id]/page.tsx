import ProfileInfoSection from "@/sections/ProfileInfoSection";
import { Skeleton } from "@nextui-org/react";
import { Suspense } from "react";

export default async function Profile({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-1/3 flex justify-center mt-10">
          <Skeleton className="w-full h-full max-w-lg max-h-xl rounded-lg" />
        </div>
      }
    >
      <ProfileInfoSection id={id} />
    </Suspense>
  );
}
