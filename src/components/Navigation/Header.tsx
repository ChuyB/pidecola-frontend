import logo from "@/assets/logo.webp";
import Image from "next/image";
import Link from "next/link";
import NavigationButtons from "./NavigationButtons";
import { Suspense } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Skeleton,
} from "@nextui-org/react";

const Header = () => {
  return (
    <Navbar disableAnimation position="static">
      <NavbarBrand>
        <Link href="/">
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
          <Suspense
            fallback={<Skeleton className="h-[40px] w-[125px] rounded-lg" />}
          >
            <NavigationButtons />
          </Suspense>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
