import "@/styles/globals.css";
import "@/styles/index.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { bodyFont, headingFont, monoFont } from "@/config/fonts";
import IntroPage from "@/components/intro/introPage";
import Footer from "@/components/footer";
import { ThemeSwitch } from "@/components/theme-switch";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <IntroPage />
      <Providers themeProps={{ attribute: "class" }}>
        <div className="relative flex flex-col">
          <main className="container mx-auto max-w-7xl flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </Providers>
    </>
  );
}
