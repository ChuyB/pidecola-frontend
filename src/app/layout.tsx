import "./global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

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
        className={`${inter.className} light text-foreground bg-background h-dvh min-h-dvh flex flex-col`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
