"use client";

import { HomeIcon } from "@heroicons/react/24/outline";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HomeButton = () => {
  const pathname = usePathname();
  return (
    pathname !== "/" &&
    pathname !== "/home" && (
      <Button
        isIconOnly
        color="default"
        variant="light"
        radius="full"
        aria-label="Página principal"
        as={Link}
        href="/"
        size="sm"
      >
        <HomeIcon className="h-full text-gray-400" />
      </Button>
    )
  );
};

export default HomeButton;
