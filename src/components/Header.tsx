"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.png";
import { useEffect, useState } from "react";
import UserActions from "./UserActions";
import useNavBar from "@/hooks/useNavBar";
import { Bars3CenterLeftIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";


function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const Header = () => {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, [isTop]);
  const { setMobileMenuOpen } = useNavBar({ checkUser: true });


  const pathname = usePathname();

  const render =
  pathname !== "/" && pathname !== "/login" && pathname !== "/register";

  return (
    <header
      className={`z-50 sticky top-0 min-h-14 py-2 px-4 sm:px-10 flex justify-between sm:justify-end items-center w-full dark:bg-gray-800 transition ease-in-out duration-300 
        ${
          isTop
            ? "bg-neutral-50"
            : "shadow-md backdrop-blur-sm bg-neutral-200/80 dark:bg-gray-900/80"
        }`}
    >
      <div className="ml-8 sm:absolute w-fit right-0 left-0 text-blue-600 transition">
        <button
          type="button"
          // className="border-r border-gray-200 px-4 text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
          className={classNames(
            render ? "" : "hidden",
            "border-r border-gray-200 px-4 text-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
          )}
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      <Link
        href={"/"}
        className="ml-8 sm:absolute w-fit right-0 left-0 sm:mx-auto text-blue-600 transition"
      >
        <Image src={logo} alt="Logo del PideCola" height={40} width={40} />
      </Link>

      <UserActions />
    </header>
  );
};

export default Header;
