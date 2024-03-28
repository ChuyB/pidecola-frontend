"use client";

import {
  ArrowLeftStartOnRectangleIcon,
  Cog6ToothIcon,
  TruckIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DropdownNavigationProps {
  userData: { name: string; email: string } | undefined;
}

const DropdownNavigation = ({ userData }: DropdownNavigationProps) => {
  const iconClasses = "pointer-events-none w-5";
  const pathname = usePathname();

  return userData ? (
    <Dropdown>
      <DropdownTrigger>
        <Avatar
          isBordered
          color="warning"
          as={Button}
          isIconOnly
          radius="full"
          size="sm"
          name={userData ? userData.name : ""}
        />
      </DropdownTrigger>

      <DropdownMenu aria-label="Navegación del usuario" color="warning">
        <DropdownSection>
          <DropdownItem key="profile-information" color="default" showDivider>
            <p className="font-semibold">{userData.name}</p>
            <p className="text-primary">{userData.email}</p>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            key="perfil"
            as={Link}
            startContent={<UserIcon className={iconClasses} />}
            href="/profile"
          >
            Mi Perfil
          </DropdownItem>

          <DropdownItem
            key="cerrar sesión"
            className="text-danger"
            as={Link}
            href="/logout"
            color="danger"
            startContent={
              <ArrowLeftStartOnRectangleIcon className={iconClasses} />
            }
          >
            Cerrar sesión
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  ) : (
    pathname !== "/register" && pathname !== "/login" && (
      <div className="flex flex-row gap-4">
        <Button color="primary" variant="bordered" as={Link} href="/login">
          Iniciar Sesión
        </Button>
        <Button
          className="hidden md:flex"
          color="primary"
          variant="solid"
          as={Link}
          href="/register"
        >
          Regístrate
        </Button>
      </div>
    )
  );
};

export default DropdownNavigation;
