"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Button } from "@heroui/button";
import AnimatedButton from "../buttons/animatedButton";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";

const imagesLeft = ["/gallery/img1.webp", "/gallery/img2.webp", "/gallery/img3.webp"];
const imagesCenter = ["/gallery/img4.webp", "/gallery/img5.webp", "/gallery/img6.webp"];
const imagesRight = ["/gallery/img7.webp", "/gallery/img8.webp", "/gallery/img2.webp"];

export default function VerticalThreeColumnCarousel() {
    const leftRef = useRef<HTMLDivElement>(null);
    const centerRef = useRef<HTMLDivElement>(null);
    const rightRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const createInfiniteScroll = (
            column: HTMLDivElement | null,
            duration: number,
            direction: "up" | "down"
        ) => {
            if (!column) return;

            const parent = column.parentElement;
            if (!parent) return;

            const columnHeight = column.offsetHeight;

            // Create wrapper
            const wrapper = document.createElement("div");
            wrapper.style.position = "absolute";
            wrapper.style.top = "0";
            wrapper.style.left = "0";
            wrapper.style.width = "100%";
            wrapper.style.display = "flex";
            wrapper.style.flexDirection = "column";
            parent.appendChild(wrapper);

            // Move original column into wrapper
            wrapper.appendChild(column);

            // Clone column for seamless loop
            const clone = column.cloneNode(true) as HTMLDivElement;
            wrapper.appendChild(clone);

            // Set initial position
            gsap.set(wrapper, { y: direction === "up" ? 0 : -columnHeight });

            // Animate wrapper
            return gsap.to(wrapper, {
                y: direction === "up" ? -columnHeight : 0,
                ease: "none",
                duration,
                repeat: -1,
            });
        };

        const leftTween = createInfiniteScroll(leftRef.current, 30, "up");
        const centerTween = createInfiniteScroll(centerRef.current, 30, "down");
        const rightTween = createInfiniteScroll(rightRef.current, 30, "up");

        return () => {
            leftTween?.kill();
            centerTween?.kill();
            rightTween?.kill();
        };
    }, []);

    const columnStyle = "flex flex-col gap-2";

    return (
        <section className="relative flex w-full h-[100vh] overflow-hidden gap-2">
            <div className="flex absolute top-0 left-0 w-full h-full bg-gradient-to-br to-blue-500 from-blue-500/10 from-65%"></div>
            {/* Left column */}
            <div className="relative w-[35%] h-full overflow-hidden">
                <div ref={leftRef} className={columnStyle}>
                    {imagesLeft.map((src, i) => (
                        <img key={i} src={src} width={500} height={1000} alt={`Left ${i + 1}`} className="w-full object-cover h-[500px]" />
                    ))}
                </div>
            </div>

            {/* Center column */}
            <div className="relative w-[30%] h-full overflow-hidden">
                <div ref={centerRef} className={columnStyle}>
                    {imagesCenter.map((src, i) => (
                        <img key={i} src={src} width={500} height={1000} alt={`Center ${i + 1}`} className="w-full object-cover h-[500px]" />
                    ))}
                </div>
            </div>

            {/* Right column */}
            <div className="relative w-[35%] h-full overflow-hidden gap-2">
                <div ref={rightRef} className={columnStyle}>
                    {imagesRight.map((src, i) => (
                        <img key={i} src={src} width={500} height={1000} alt={`Right ${i + 1}`} className="w-full object-cover h-[500px]" />
                    ))}
                </div>
            </div>

            <div className="flex absolute top-0 left-0 w-full h-full bg-blue-500/10"></div>
            <div className="flex absolute top-0 left-0 w-full h-full justify-center items-center z-10">
                <div className="mb-52 rounded-2xl p-[2px] bg-gradient-to-tl from-yellow-500 to-red-500">
                    <Button
                        size="lg"
                        className="bg-black text-white h-18"
                        endContent={<HugeiconsIcon icon={ArrowRight01Icon} />}
                        disableAnimation
                    >
                        <h5 className="font-bold bg-gradient-to-tl to-yellow-500 from-red-500 text-transparent bg-clip-text">+100</h5>
                        <AnimatedButton label="View Gallery" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
