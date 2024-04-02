"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import usb from "@/assets/usb.png";
import fce from "@/assets/logo_federacion.png";
import ceic from "@/assets/logo_ceic.png";

const LogosSection = () => {
  const { ref, inView } = useInView({});
  return (
    <section className="mt-10 mb-40 items-center">
      <h2 className="text-xl text-center text-blue-950 dark:text-yellow-50 font-bold">
        Un proyecto de:
      </h2>
y mx 
      <main
        ref={ref}
        className={` ${inView ? "animate-fade-up" : "opacity-0"}
                  grid grid-cols-3 grid-row-1 gap-8 md:gap-32 place-items-center mt-10
                `}
      >
        <Image src={usb} alt="Logo de la Universidad Simón Bolívar" />
        <Image
          src={fce}
          alt="Logo de la Federación de Centros de Estudiantes de la Universidad Simón Bolívar"
        />
        <Image
          src={ceic}
          alt="Logo del Centro de Estudiantes de Ingeniería de la Computación"
        />
      </main>
    </section>
  );
};

export default LogosSection;
