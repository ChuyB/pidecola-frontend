import "./global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Sidebar from "@/components/Sidebar";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pidecola",
  description:
    "Web app para viajes compartidos desde y hacia la Universidad Simón Bolívar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es" data-theme="light">
      <body
        className={`${inter.className} light text-foreground bg-background`}
      >
        <Providers>
          <div className="flex h-screen overflow-y-hidden">
            <Sidebar/>
            <main className="flex-1 overflow-y-auto"> {children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
