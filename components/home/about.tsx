import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import "./styles/about.css";

gsap.registerPlugin(ScrollTrigger);

const highlightedWords = [
    "We",
    "believe",
    "minds",
    "bright",
    "faculty",
    "receive",
    "well-rounded",
];

export default function About() {
    const textContainer = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!textContainer.current) return;
        const section = document.querySelector(".about-sec");
        if (!section) return;

        // read text and build nodes
        const text = textContainer.current.textContent || "";
        const words = text.trim().split(/\s+/);
        textContainer.current.textContent = "";

        const wordContainers: HTMLElement[] = [];
        const spans: HTMLElement[] = [];

        words.forEach((rawWord, index) => {
            // keep punctuation attached to the visible word
            const cleaned = rawWord.replace(/[.,]/g, "");
            const wrapper = document.createElement("div");
            wrapper.className = "word-wrapper";
            wrapper.style.setProperty("--bg-opacity", "0");
            wrapper.style.background = "rgba(0,0,0,var(--bg-opacity))";

            const span = document.createElement("span");
            span.className = "word-text";
            span.style.opacity = "0";
            span.style.lineHeight = "0.5";
            span.textContent = rawWord;

            if (index == 0) {
                span.classList.add("first");
                wrapper.classList.add("first");
            }

            if (highlightedWords.includes(cleaned)) {
                span.classList.add("keyword", cleaned);
            }

            wrapper.appendChild(span);
            textContainer.current!.appendChild(wrapper);

            wordContainers.push(wrapper);
            spans.push(span);
        });

        // tuning params
        const each = 0.1; // stagger (seconds per word) — smaller = tighter overlap
        const gapWords = 10; // how many words gap before bg fades out and text fades in
        const bgAlpha = 0.1; // target background darkness

        // build timeline controlled by ScrollTrigger
        const tl = gsap.timeline({
            defaults: { ease: "power1.out" },
        });

        // 1) Background shows (stagger from start)
        tl.to(
            wordContainers,
            {
                // animate CSS variable --bg-opacity from 0 -> bgAlpha
                // gsap will animate CSS custom props if set as strings
                // use onUpdate to flush computed background (not necessary but kept consistent)
                duration: 0.6,
                stagger: { each, from: 0 },
                // GSAP can animate CSS variables directly using the syntax below:
                // but TypeScript/Gsap typings may complain; this works at runtime
                // @ts-ignore
                "--bg-opacity": bgAlpha,
            },
            0
        );

        // compute gap delay (so that fade out of bg starts after gapWords of stagger)
        const gapDelay = Math.max(0, gapWords * each) + 0.2;

        // 2) Background fades OUT (staggered from start) AND text fades IN (same timing)
        //    We start this group at gapDelay so background had time to show across early words.
        tl.to(
            wordContainers,
            {
                duration: 0.6,
                stagger: { each, from: 0 },
                // @ts-ignore
                "--bg-opacity": 0,
            },
            gapDelay
        );

        tl.to(
            spans,
            {
                duration: 0.6,
                stagger: { each, from: 0 },
                opacity: 1,
            },
            gapDelay + 0.4 // slight offset so text begins right as bg is going out
        );

        // 3) At the end: text fades OUT (stagger from end) and background fades BACK IN (stagger from end)
        //    We place these near the end of timeline by starting them after the previous staggers roughly finish.
        const approxEndStart = gapDelay + Math.max(words.length * each, 0.8) + 1;

        tl.to(
            spans,
            {
                duration: 0.5,
                stagger: { each, from: "start" },
                opacity: 0,
            },
            approxEndStart
        );

        tl.to(
            wordContainers,
            {
                duration: 0.6,
                stagger: { each, from: "start" },
                // @ts-ignore
                "--bg-opacity": bgAlpha,
            },
            approxEndStart + 0.5
        );

        // Hook timeline to ScrollTrigger (scrub = true ties timeline progress to scroll)
        ScrollTrigger.create({
            animation: tl,
            trigger: section,
            start: "top top",
            end: "+=250%", // adjust scroll length to taste
            scrub: 1,
            pin: true,
            anticipatePin: 1,
        });

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach((t) => t.kill());
            tl.kill();
        };
    }, []);

    return (
        <div className="overflow-hidden">
            <section className="about-sec relative flex justify-center items-center h-[100vh]">
                <p
                    ref={textContainer}
                    className="flex flex-wrap text-xl md:text-2xl font-bold absolute px-14 leading-relaxed max-w-2xl"
                >
                    We believe in nurturing young minds and preparing them for a bright
                    future. Our experienced faculty and comprehensive curriculum ensure
                    that students receive a well-rounded education in a supportive
                    environment.
                </p>
            </section>
        </div>
    );
}
