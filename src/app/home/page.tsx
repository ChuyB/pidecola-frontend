import Image from "next/image";
import { Card, CardHeader, CardFooter, Button } from "@nextui-org/react";
import roadway from "@/assets/intersection.webp";
import driver from "@/assets/driver.webp";
import Link from "next/link";
import { getUserRole } from "@/lib/actions/users";

export default async function Home() {
  // const role = await getUserRole();
  return (
    <div className="min-h-3/4 flex flex-col justify-center items-center">
      <div className="h-full w-min flex flex-col gap-y-8 md:gap-y-12 justify-center items-center py-10">
        <h1 className="w-full text-3xl font-bold text-left md:text-center">
          ¿Qué deseas hacer?
        </h1>

        <section className="h-full flex flex-col gap-10 md:flex-row justify-center items-center">
          <RideRequestCard />
          <OfferSeatsCard />
          {/*
            role === "driver" && <OfferSeatsCard />
            */}
        </section>
      </div>
    </div>
  );
}

const RideRequestCard = () => {
  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="w-[350px] h-[440px] border-none after:absolute after:bg-black/10 after:inset-0 after:m-auto"
    >
      <CardHeader className="absolute z-10 top-1 flex-col !items-start animate-fade-up">
        <p className="text-sm text-white/60 uppercase font-bold">
          ¿Necesitas movilizarte?
        </p>
        <h4 className="text-white font-medium text-xl w-1/2">
          Puedes preguntar a un conductor amigo
        </h4>
      </CardHeader>
      <Image
        src={roadway}
        alt="Una vista aérea de un distribuidor de tráfico con muchos vehículos"
        width={350}
        priority={true}
        placeholder="blur"
        className="h-auto object-cover"
      />
      <CardFooter className="absolute bottom-0 bg-white/30 z-10 justify-end">
        <Button
          as={Link}
          href="/request-ride"
          className="text-sm"
          color="primary"
          size="md"
        >
          Pedir cola
        </Button>
      </CardFooter>
    </Card>
  );
};

const OfferSeatsCard = () => {
  return (
    <Card
      isFooterBlurred
      radius="lg"
      className="w-[350px] h-[440px] border-none after:absolute after:bg-black/35 after:inset-0 after:m-auto"
    >
      <CardHeader className="absolute z-10 top-1 flex-col !items-start animate-fade-up">
        <p className="text-sm text-white/60 uppercase font-bold">
          ¿Tienes carro?
        </p>
        <h4 className="text-white font-medium text-xl w-1/2">
          Puedes ofrecerle una cola a compañeros
        </h4>
      </CardHeader>
      <Image
        src={driver}
        alt="Una vista aérea de un distribuidor de tráfico con muchos vehículos"
        width={350}
        priority={true}
        placeholder="blur"
        className="w-full object-cover"
      />
      <CardFooter className="absolute bottom-0 bg-white/30 z-10 justify-end">
        <Button
          as={Link}
          href="/offer-seats"
          className="text-sm"
          color="primary"
          size="md"
        >
          Ofrecer Cola
        </Button>
      </CardFooter>
    </Card>
  );
};
