"use client";

import type { ThemeProviderProps } from "next-themes";

import { HeroUIProvider } from "@heroui/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider, ThemeProvider } from "next-themes";
import { DialogProvider } from "@/components/dialog/dialogProvider";
import gsap from "gsap";
import { useEffect } from "react";
import Lenis from 'lenis';
import { Navbar } from "@/components/navbar";
import PageTransition from "@/components/transition/pageTransition";
import { ThemeSwitch } from "@/components/theme-switch";

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
    <ThemeProvider attribute="class">
      <main id="app-body" className="bg-background dark:bg-black text-black dark:text-white h-[100dvh] relative" style={{ clipPath: "polygon(0 48%, 0 48%, 0 52%, 0 52%)" }}>
        <PageTransition>
          <>
            <Navbar />
            <HeroUIProvider navigate={router.push}>
              <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
              <DialogProvider />
              <div className="flex fixed z-50 bottom-6 right-6 bg-black/10 dark:bg-white/20 rounded-full p-2 backdrop-blur-sm">
                <ThemeSwitch />
              </div>
            </HeroUIProvider>
          </>
        </PageTransition>
      </main>
    </ThemeProvider>
  );
}
