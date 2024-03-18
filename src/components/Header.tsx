"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../assets/logo.webp";
import { useEffect, useState } from "react";
import UserInfo from "./UserInfo";

const Header = () => {
  const [isTop, setIsTop] = useState(true);

  useEffect(() => {
    const scrollHandler = () => {
      setIsTop(window.scrollY === 0);
    };

    window.addEventListener("scroll", scrollHandler);

    return () => window.removeEventListener("scroll", scrollHandler);
  }, [isTop]);

  return (
    <header
      className={`z-50 sticky top-0 min-h-14 py-2 px-4 sm:px-10 flex justify-between sm:justify-end items-center w-full dark:bg-gray-800 transition ease-in-out duration-300 
        ${
          isTop
            ? "bg-neutral-50"
            : "shadow-md backdrop-blur-sm bg-neutral-200/80 dark:bg-gray-900/80"
        }`}
    >
      <Link
        href={"/"}
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

      <UserInfo />
    </header>
  );
};

export default Header;
