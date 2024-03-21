import LogosSection from "@/sections/LogosSection";
import HeroSection from "@/sections/HeroSection";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center px-10 md:px-24 lg:px-32 xl:px-40">
      <div className="max-w-7xl flex flex-col grow items-center">
        <HeroSection />
        <LogosSection />
      </div>
    </main>
  );
}
