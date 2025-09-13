// fonts.ts
import { Lexend, Montserrat, DM_Sans } from "next/font/google";

export const bodyFont = Lexend({
  subsets: ["latin"],
  variable: "--font-body",
});

export const headingFont = Montserrat({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const monoFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-mono",
});