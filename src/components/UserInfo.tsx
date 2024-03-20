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
  TruckIcon,
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

const UserInfo = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const isLoginOrRegister = pathname === "/login" || pathname === "/register";

  useEffect(() => {
    getUserEmail().then((data) => {
      setUserData(data);
      setIsLoading(false);
    });
  }, []);

  const iconClasses = "pointer-events-none w-5";

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
              as={Link}
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
          <DropdownMenu aria-label="User Actions" color="warning">
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
    </Skeleton>
  );
};

export default UserInfo;
