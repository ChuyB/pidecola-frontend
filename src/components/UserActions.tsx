"use client";

import Link from "next/link";
import { Skeleton } from "@nextui-org/skeleton";
import { User } from "@nextui-org/user";
import {
  UserIcon,
  Cog6ToothIcon,
  ArrowLeftStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  UserPlusIcon,
  TruckIcon
} from "@heroicons/react/16/solid";
import {
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
} from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getUserEmail } from "@/lib/actions/users";

interface UserData {
  email: string;
  name: string;
}

const UserActions = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const isLoginOrRegister = pathname === "/login" || pathname === "/register";

  const iconClasses = "pointer-events-none w-5";

  useEffect(() => {
    const updateUserData = async () => {
      const userData = (await getUserEmail()) as UserData;
      setUserData(userData);
    };

    setIsLoading(true);
    updateUserData();
    setIsLoading(false);
  }, []);

  return isLoginOrRegister ? (
    <></>
  ) : (
    <Skeleton isLoaded={!isLoading} className="rounded-lg">
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
              key="vehiculos"
              startContent={<TruckIcon className={iconClasses} />}
            >
              <Link href="/vehicles" className="block w-full">
                Vehículos
              </Link>
            </DropdownItem>

            <DropdownItem
              key="perfil"
              startContent={<Cog6ToothIcon className={iconClasses} />}
            >
              <Link href="/profile" className="block w-full">
                Configuración
              </Link>
            </DropdownItem>

            <DropdownItem
              key="cerrar sesión"
              className="text-danger"
              color="danger"
              startContent={
                <ArrowLeftStartOnRectangleIcon className={iconClasses} />
              }
            >
              <Link href="/logout" className="block w-full">
                Cerrar sesión
              </Link>
            </DropdownItem>
          </DropdownMenu>
        ) : (
          <DropdownMenu aria-label="User Actions" color="warning">
            <DropdownItem
              key="iniciar sesión"
              startContent={
                <ArrowRightEndOnRectangleIcon className={iconClasses} />
              }
            >
              <Link href="/login" className="block w-full">
                Iniciar sesión
              </Link>
            </DropdownItem>

            <DropdownItem
              key="registro"
              startContent={<UserPlusIcon className={iconClasses} />}
            >
              <Link href="/register" className="block w-full">
                Registrarte
              </Link>
            </DropdownItem>
          </DropdownMenu>
        )}
      </Dropdown>
    </Skeleton>
  );
};

export default UserActions;
