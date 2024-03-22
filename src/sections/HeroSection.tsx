import Image from "next/image";
import carpool from "@/assets/carpool.svg";
import CallToActionButton from "@/components/CallToActionButton";

const HeroSection = () => {
  return (
    <section
      className={`
          relative flex flex-col items-center justify-center
          w-full text-center mt-10 pb-14 md:pb-24
          border-b-1 border-slate-300
        `}
    >
      <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 place-items-center gap-8 lg:gap-20 mb-12 md:mb-24">
        <h1 className="z-20 text-3xl leading-tight font-black text-blue-950 dark:text-orange-50 animate-fade-right drop-shadow-md">
          {"En cada viaje compartido, tejemos historias, creamos lazos y "}
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-yellow-400 to-orange-500">
            forjamos un camino juntos{" "}
          </span>
        </h1>

        <Image
          src={carpool}
          alt="Una imágen vectorizada de dos personas junto a un vehículo azul"
          className="animate-fade-left"
        />
      </div>

      <CallToActionButton />
    </section>
  );
};

export default HeroSection;
