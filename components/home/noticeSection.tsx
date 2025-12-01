"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { ArrowRight02FreeIcons, Comment01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import AnimatedButton from "../buttons/animatedButton";

const notices = [
    {
        title: "Admission Test-IX Result Published",
        des: "Details about the admission test I result for class IX.",
        date: "12th March 2025",
    },
    {
        title: "Now You Can Apply for Admission Test-X",
        des: "Details about the admission test result for class X.",
        date: "12th March 2025",
    },
    {
        title: "We Are Hiring Teachers for New Session",
        des: "Join our team of dedicated educators. Apply now!",
        date: "12th March 2025",
    },
    {
        title: "You Are Invited to Our Annual Day",
        des: "Join us for a day of celebration and fun activities.",
        date: "12th March 2025",
    },
];

export default function NoticeSection() {
    const boxesRef = useRef<HTMLDivElement[]>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (window.innerWidth <= 640) return;
        boxesRef.current.forEach((box, i) => {
            gsap.set(box, { y: "90%" });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    scrub: true,
                    start: `${i * 30}% center`,
                    end: `bottom+=${(i * 30) + 380}% center`,
                },
            });

            tl.to(box, {
                y: "-50%",
                ease: "power3.out",
            })
                .to(box, {
                    y: "-35%",
                    ease: "power3.out",
                })
                .to(box, {
                    y: "-180%",
                    ease: "power3.out",
                });
        });
    }, []);

    return (
        <>
            {/* HEADER SECTION */}
            <section className="flex max-w-7xl mx-auto sm:h-screen px-6 py-18 gap-6">
                <div className="h-full flex flex-col justify-center gap-6">
                    <p className="opacity-55">NOTICE BOARD</p>

                    <h1 className="text-3xl sm:text-7xl font-bold leading-tight">
                        Recently<br />Announced by Us
                    </h1>

                    <div className="flex justify-between border-t border-black/30 dark:border-white/30 pt-4">
                        <AnimatedButton label="View All Notices" />
                        <HugeiconsIcon icon={ArrowRight02FreeIcons} size={24} />
                    </div>
                </div>
            </section>

            {/* PINNED NOTICE GRID */}
            <section className="sm:h-[680vh] relative sm:-mt-[50vh] mb-10 sm:-mb-[130vh]">
                <div className="sm:pt-[50vh] sticky top-0">
                    <div
                        ref={containerRef}
                        className="hidden sm:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6 h-screen"
                    >
                        {notices.map((n, i) => (
                            <NoticeBox
                                key={i}
                                title={n.title}
                                date={n.date}
                                des={n.des}
                                innerRef={(el: HTMLDivElement) => (boxesRef.current[i] = el)}
                            />
                        ))}
                    </div>
                    <div className="grid sm:hidden grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
                        {notices.map((n, i) => (
                            <NoticeBox
                                key={i}
                                title={n.title}
                                date={n.date}
                                des={n.des}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

/* ----------------------------- NoticeBox ----------------------------- */

function NoticeBox({
    title,
    date,
    des,
    innerRef,
}: {
    title: string;
    date: string;
    des: string;
    innerRef?: (el: HTMLDivElement) => void;
}) {
    return (
        <div
            ref={innerRef}
            className="flex flex-col justify-between border border-black/10 bg-black/5 dark:border-white/10 dark:bg-white/5 rounded-3xl p-6 gap-4 w-full aspect-[1/1.3]"
        >
            <HugeiconsIcon icon={Comment01Icon} size={62} className="text-[#ff6200] mt-4" />

            <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="opacity-55 mt-2">{des}</p>
                <p className="opacity-55 mt-2">{date}</p>
            </div>
        </div>
    );
}
