"use client";
import { useRouter } from "next/navigation";
import { ProfileDetails } from "@/components/ProfileDetails";
import { getCookiesJson } from "@/lib/api/baseApi";
import { useEffect, useState } from "react";

export default function Page() {
  const [id, setId] = useState<number | undefined>(undefined);

  useEffect(() => {
    getCookiesJson().then((data) => setId(data?.user_id));
  }, []);

  //TODO: Mejorar el efecto de carga
  const router = useRouter();
  if (!id) return <h1>loading</h1>;

  router.push(`/profile/${id}`);
}
