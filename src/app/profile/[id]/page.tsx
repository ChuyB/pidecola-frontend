import ProfileCard from "@/components/Profile/ProfileCard";
import { Skeleton } from "@nextui-org/react";
import { Suspense } from "react";

export default async function Profile({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    <section className="flex justify-center mt-10 p-4">
      <Suspense
        fallback={
          <div className="w-full h-1/3 flex justify-center mt-10">
            <Skeleton className="w-full h-full max-w-lg max-h-xl rounded-lg" />
          </div>
        }
      >
        <ProfileCard id={id} />
      </Suspense>
    </section>
  );
}
