"use client";

import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

const CallToActionButton = () => {
  const router = useRouter();
  return (
    <Button
      size="lg"
      radius="full"
      className={`bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 font-bold text-white`}
      onClick={() => router.push("/register")}
    >
      ¡Únete ahora!
    </Button>
  );
};

export default CallToActionButton;
