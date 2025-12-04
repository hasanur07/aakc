"use client";

import React, { useEffect, useRef, useState } from "react";
import "@/styles/globals.css";
import "@/styles/index.css";
import { antonFont, monoFont } from "@/config/fonts";
import Image from "next/image";
import { Button } from "@heroui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { CircleArrowLeft01Icon, CircleArrowUpRight02Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";

export default function NotFound() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [fontSize, setFontSize] = useState(50);
    const text = "404";

    const setSize = () => {
        if (!containerRef.current) return;
        const { width } = containerRef.current.getBoundingClientRect();
        const newFontSize = width / (text.length / (width > 640 ? 1.4 : 1.75));
        setFontSize(newFontSize);
    };

    useEffect(() => {
        setSize();
        window.addEventListener("resize", setSize);
        return () => {
            window.removeEventListener("resize", setSize);
        };
    }, [text]);
    return (
        <>
            <nav className="flex justify-between w-full px-6 py-2 fixed z-10">
                <div className="flex gap-2 items-center">
                    <Image
                        src="/logo_tr.png"
                        alt="Logo"
                        width={30}
                        height={30}
                    />
                    <h5 className="font-mono font-bold">AAKC</h5>
                </div>
                <Button
                    as={Link}
                    href="https://hasanur.doclet.app"
                    size="sm"
                    variant="solid"
                    endContent={<HugeiconsIcon icon={CircleArrowUpRight02Icon} size={18} />}
                    className="bg-white px-2 pl-4">
                    hasanur.io
                </Button>
            </nav>
            <section ref={containerRef} className={`flex relative m-0 p-0 w-full h-[100svh] justify-center items-center bg-gradient-to-b from-sky-200 to-white overflow-hidden ${antonFont.className} ${antonFont.variable}`}>
                <h5 className="bg-gradient-to-b from-white to-sky-50 bg-clip-text text-transparent font-anton" style={{ fontSize, fontWeight: 600 }}>{text}</h5>
                <Image
                    src="/imgs/res/cloud.png"
                    alt="Cloud Decoration"
                    width={300}
                    height={100}
                    className="absolute w-[100%] bottom-0 animate-float"
                />
                <Image
                    src="/models/404-mascot.png"
                    alt="404 Mascot"
                    width={450}
                    height={450}
                    className="absolute w-[50%] sm:w-[37.5%] -mt-[4%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
                <div className="flex flex-col absolute bottom-0 py-6 px-4 justify-center items-center text-center font-mono">
                    <h1 className="font-mono text-4xl font-semibold">Opps, I think we're lost</h1>
                    <span className="opacity-55 text-sm pt-2">Let's get you back to somewhere familiar...</span>
                    <Button
                        as={Link}
                        href="/"
                        size="sm"
                        variant="faded"
                        startContent={<HugeiconsIcon icon={CircleArrowLeft01Icon} size={18} />}
                        className="mt-6 mb-2 bg-white border-black/10 px-2 pr-4">
                        Back to home
                    </Button>
                </div>
            </section>
        </>
    )
}
