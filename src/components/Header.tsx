import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.webp";
import UserInfo from "./UserInfo";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { Suspense } from "react";
import { Skeleton } from "@nextui-org/react";

const Header = () => {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <Link
          href="/"
          className="ml-8 sm:absolute w-fit right-0 left-0 sm:mx-auto text-blue-600 transition"
        >
          <Image
            src={logo}
            alt="Logo del PideCola"
            height={40}
            width={40}
            className="w-auto"
            priority={true}
          />
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <Suspense fallback={<Skeleton className="h-[40px] w-[125px] rounded-lg"/>}>
            <UserInfo />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
