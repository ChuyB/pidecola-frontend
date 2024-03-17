import Link from "next/link";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen bg-neutral-50 dark:bg-gray-800">
      <Header />
      <div className="h-full place-self-center flex flex-col items-center justify-center">
        <Link href={"/"}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-black text-blue-950 animate-fade-right drop-shadow-md">
            404
          </h1>
          <h2 className="pb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-yellow-400 to-orange-500 animate-pulse animate-duration-[2500ms]">
            Página no encontrada
          </h2>
        </Link>
        <p className="w-full text-left font-bold">
          Volver al{" "}
          <Link href="/" className="inline-block text-primary transition hover:scale-105">
            inicio
          </Link>
        </p>
      </div>
    </div>
  );
}
