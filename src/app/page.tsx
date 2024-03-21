import LogosSection from "@/sections/LogosSection";
import HeroSection from "@/sections/HeroSection";

export default function Home() {
  return (
    <main className="flex flex-col grow items-center px-10 md:px-24 lg:px-32 xl:px-40 max-w-7xl">
      <HeroSection />
      <LogosSection />
    </main>
  );
}
