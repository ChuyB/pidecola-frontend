"use client";

import {
  ArrowLeftStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  Cog6ToothIcon,
  HomeIcon,
  TruckIcon,
  UserIcon,
  UserPlusIcon,
} from "@heroicons/react/16/solid";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
} from "@nextui-org/react";
import Link from "next/link";

interface DropdownNavigationProps {
  userData: { name: string; email: string } | undefined;
}

const DropdownNavigation = ({ userData }: DropdownNavigationProps) => {
  const iconClasses = "pointer-events-none w-5";
  return (
    <Dropdown>
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            showFallback: true,
            fallback: <UserIcon className="w-6 h-6 text-default-500" />,
          }}
          name={userData ? userData.name : "Inicia sesión"}
          description={userData ? userData.email : "O regístrate"}
        />
      </DropdownTrigger>

      {userData ? (
        <DropdownMenu aria-label="User Actions" color="warning">
          <DropdownItem
            key="principal"
            as={Link}
            startContent={<HomeIcon className={iconClasses} />}
            href="/home"
          >
            Página principal
          </DropdownItem>

          <DropdownItem
            key="vehiculos"
            as={Link}
            startContent={<TruckIcon className={iconClasses} />}
            href="/vehicles"
          >
            Vehículos
          </DropdownItem>

          <DropdownItem
            key="perfil"
            as={Link}
            startContent={<Cog6ToothIcon className={iconClasses} />}
            href="/profile"
          >
            Configuración
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
        </DropdownMenu>
      ) : (
        <DropdownMenu aria-label="Navegación del usuario" color="warning">
          <DropdownItem
            key="principal"
            as={Link}
            startContent={<HomeIcon className={iconClasses} />}
            href="/"
          >
            Página principal
          </DropdownItem>

          <DropdownItem
            key="iniciar sesión"
            as={Link}
            href="/login"
            startContent={
              <ArrowRightEndOnRectangleIcon className={iconClasses} />
            }
          >
            Iniciar sesión
          </DropdownItem>

          <DropdownItem
            key="registro"
            as={Link}
            href="/register"
            startContent={<UserPlusIcon className={iconClasses} />}
          >
            Registrarte
          </DropdownItem>
        </DropdownMenu>
      )}
    </Dropdown>
  );
};

export default DropdownNavigation;
