"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SideBarProvider } from "@/context/SideBarContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SideBarProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SideBarProvider>
  );
}
