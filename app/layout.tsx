import { antonFont, bodyFont, headingFont, monoFont } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import clsx from "clsx";
import { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import "@/styles/index.css";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning className="bg-background text-black dark:text-white dark:bg-black">
            <body
                className={clsx(
                    "font-body antialiased",
                    bodyFont.variable,
                    headingFont.variable,
                    monoFont.variable,
                    antonFont.variable
                )}
            >{children}
            </body>
        </html>
    );
}
