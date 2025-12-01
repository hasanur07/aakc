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

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/logo_tr.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className="bg-background text-black dark:text-white dark:bg-black">
      <head />
      <body
        className={clsx(
          "font-body antialiased",
          bodyFont.variable,
          headingFont.variable,
          monoFont.variable
        )}
      >
        <IntroPage />
        <Providers themeProps={{ attribute: "class" }}>
          <div className="relative flex flex-col">
            <main className="container mx-auto max-w-7xl flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
