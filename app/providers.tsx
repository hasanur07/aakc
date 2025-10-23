"use client";

import type { ThemeProviderProps } from "next-themes";

import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { DialogProvider } from "@/components/dialog/dialogProvider";
import gsap from "gsap";
import { useEffect } from "react";
import Lenis from 'lenis';
import { Navbar } from "@/components/navbar";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  useEffect(() => {
    gsap.set("#app-body", { clipPath: "polygon(0 48%, 0 48%, 0 52%, 0 52%)" });
  }, []);

  useEffect(() => {

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let frame: number;
    const animate = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);


  return (
    <main id="app-body" className="bg-background h-[100dvh] relative" style={{ clipPath: "polygon(0 48%, 0 48%, 0 52%, 0 52%)" }}>
      <Navbar />
      <HeroUIProvider navigate={router.push}>
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
        <DialogProvider></DialogProvider>
      </HeroUIProvider>
    </main>
  );
}
