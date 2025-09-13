import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { bodyFont, headingFont, monoFont } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import IntroPage from "@/components/intro/introPage";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en" className="overflow-hidden bg-[#F9FAFB] dark:bg-[#111827] text-[#111827] dark:text-[#F9FAFB]">
      <head />
      <body
        className={clsx(
          "min-h-screen font-body antialiased overflow-hidden",
          bodyFont.variable,
          headingFont.variable,
          monoFont.variable
        )}
      >
        <IntroPage />
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl flex-grow">
              {children}
            </main>
            <footer className="flex flex-col border-t border-black max-w-7xl mx-auto w-full px-6 mt-12">
              <div className="py-4">
                <h1>AL AMEEN KNOWLEDGE CITY</h1>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold">Contact Us</h2>
                  <p>123 Knowledge St.</p>
                  <p>City, State, ZIP</p>
                  <p>Email: info@aakcedu.com</p>
                  <p>Phone: (123) 456-7890</p>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold">Quick Links</h2>
                  <Link href="#" className="text-current">About Us</Link>
                  <Link href="#" className="text-current">Admissions</Link>
                  <Link href="#" className="text-current">Programs</Link>
                  <Link href="#" className="text-current">Contact</Link>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold">Follow Us</h2>
                  <Link href="#" className="text-current">Facebook</Link>
                  <Link href="#" className="text-current">Twitter</Link>
                  <Link href="#" className="text-current">Instagram</Link>
                  <Link href="#" className="text-current">LinkedIn</Link>
                </div>
              </div>
            </footer>
            <div className="w-full flex items-center justify-between py-3 mt-6 border-t border-black max-w-7xl mx-auto px-6 md:px-0">
              <span className="text-default-600">Made with 💕</span>
              <Link
                isExternal
                color="foreground"
                href="https://hasanur.doclet.app?utm_source=aakc"
                title="hasanur.12 portfolio"
              >
                <p>by hasanur.io</p>
              </Link>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
