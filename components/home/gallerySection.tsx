"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface HoverImageProps {
    src: string;
    title: string;
}

function HoverImage({ src, title }: HoverImageProps) {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);

    return (
        <div
            className="relative flex flex-col gap-2 img"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
            onMouseMove={(e) => {
                const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
                setPos({
                    x: e.clientX - rect.left + 10,
                    y: e.clientY - rect.top + 10,
                });
            }}
        >
            <Image
                src={src}
                alt={title}
                width={400}
                height={500}
                className="w-full h-[300px] sm:h-[500px] rounded-xl object-cover grayscale hover:grayscale-0 transition-all duration-300"
            />
            {visible && (
                <h2
                    className="absolute text-[12px] p-2 rounded-lg bg-black text-gray-100 pointer-events-none"
                    style={{ left: pos.x, top: pos.y }}
                >
                    {title}
                </h2>
            )}
        </div>
    );
}

export default function GallerySection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const col1Ref = useRef<HTMLDivElement>(null);
    const col2Ref = useRef<HTMLDivElement>(null);
    const col3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const appBody = document.querySelector("#app-body");
        if (!sectionRef.current || !appBody) return;

        let ctx = gsap.context(() => {
            const options = {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
                scroller: appBody,
            };

            if (col1Ref.current) {
                gsap.fromTo(col1Ref.current, { y: -400 }, { y: 300, scrollTrigger: options });
            }

            if (col2Ref.current) {
                gsap.fromTo(col2Ref.current, { y: 0 }, { y: -400, scrollTrigger: options });
            }

            if (col3Ref.current) {
                gsap.fromTo(col3Ref.current, { y: -400 }, { y: 300, scrollTrigger: options });
            }
        }, sectionRef);

        ScrollTrigger.refresh();
        return () => ctx.revert();
    }, []);


    return (
        <section
            ref={sectionRef}
            className="flex flex-col relative h-[calc(100vh+300px)] gap-4 max-w-7xl px-6 overflow-hidden"
        >
            {/* Top gradient */}
            <div className="flex absolute top-0 w-full h-[250px] bg-gradient-to-b from-[#F9FAFB] to-white/0 z-10 pointer-events-none"></div>

            <div className="grid grid-cols-3 gap-2 sm:gap-8 w-full">
                {/* Column 1 */}
                <div ref={col1Ref} className="flex flex-col gap-2 sm:gap-8">
                    {[1, 2, 3].map((num) => (
                        <HoverImage
                            key={num}
                            src={`/gallery/img${num}.webp`}
                            title={`Image Title ${num}`}
                        />
                    ))}
                </div>

                {/* Column 2 */}
                <div ref={col2Ref} className="flex flex-col gap-2 sm:gap-8">
                    {[5, 4, 7, 8].map((num) => (
                        <HoverImage
                            key={num}
                            src={`/gallery/img${num}.webp`}
                            title={`Image Title ${num}`}
                        />
                    ))}
                </div>

                {/* Column 3 */}
                <div ref={col3Ref} className="flex flex-col gap-2 sm:gap-8">
                    {[8, 7, 3, 4].map((num) => (
                        <HoverImage
                            key={num}
                            src={`/gallery/img${num}.webp`}
                            title={`Image Title ${num}`}
                        />
                    ))}
                </div>
            </div>

            {/* Bottom gradient */}
            <div className="flex absolute bottom-0 w-full h-[250px] bg-gradient-to-b to-[#F9FAFB] from-white/0 pointer-events-none"></div>
        </section>
    );
}
