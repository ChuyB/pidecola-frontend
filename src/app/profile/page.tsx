"use client";
import { useRouter } from "next/navigation";
import { getCookiesJson } from "@/lib/api/baseApi";
import { useEffect, useState } from "react";
import { Skeleton } from "@nextui-org/react";

export default function Page() {
  const [id, setId] = useState<number | undefined>(undefined);

  useEffect(() => {
    getCookiesJson().then((data) => setId(data?.user_id));
  }, []);

  const router = useRouter();
  if (!id)
    return (
      <div className="w-full h-1/3 flex justify-center mt-10">
        <Skeleton className="w-full h-full max-w-lg max-h-xl rounded-lg" />
      </div>
    );

  router.push(`/profile/${id}`);
}
