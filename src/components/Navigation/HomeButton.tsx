"use client";

import { HomeIcon } from "@heroicons/react/16/solid";
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
        color="primary"
        variant="ghost"
        radius="full"
        aria-label="Página principal"
        as={Link}
        href="/"
      >
        <HomeIcon className="h-1/2" />
      </Button>
    )
  );
};

export default HomeButton;
