// fonts.ts
import { Lexend, Montserrat, DM_Sans, Anton } from "next/font/google";

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

export const antonFont = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: "400",
});