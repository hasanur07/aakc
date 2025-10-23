import React, { useEffect } from "react";
import { splittTextElements } from "../intro/helper";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    useEffect(() => {
        const section = document.querySelector(".about-sec");

        // Split each text into characters
        splittTextElements(".text-1");
        splittTextElements(".text-2");
        splittTextElements(".text-3");

        // Set all chars to invisible
        gsap.set(".about-sec .word .char", { opacity: 0 });

        // ScrollTrigger Timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=200%", // ensures 3x scroll space
                scrub: true,
                pin: true,
                anticipatePin: 1,
            },
        });

        // Animate text 1 → 2 → 3
        tl.to(".about-sec .text-1 .word .char", {
            opacity: 1,
            stagger: 0.02,
            duration: 1,
        })
            .to(".about-sec .text-1 .word .char", {
                opacity: 0,
                stagger: 0.02,
                duration: 1,
            })
            .to(".about-sec .text-2 .word .char", {
                opacity: 1,
                stagger: 0.02,
                duration: 1,
            })
            .to(".about-sec .text-2 .word .char", {
                opacity: 0,
                stagger: 0.02,
                duration: 1,
            })
            .to(".about-sec .text-3 .word .char", {
                opacity: 1,
                stagger: 0.02,
                duration: 1,
            })
            .to(".about-sec .text-3 .word .char", {
                opacity: 0,
                stagger: 0.02,
                duration: 1,
            });

        // Cleanup on unmount
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            tl.kill();
        };
    }, []);

    return (
        <div className="h-[300vh] overflow-hidden">
            <section className="about-sec relative flex justify-center items-center h-[100vh]">
                <h5 className="text-1 text-xl md:text-3xl font-bold absolute">
                    💕
                </h5>
                <h5 className="text-2 text-xl md:text-3xl font-bold absolute text-center px-8">
                    At Al Ameen Knowledge City Missionary School
                </h5>
                <p className="text-3 text-xl md:text-3xl font-bold absolute text-center px-14 leading-relaxed">
                    We believe in nurturing young minds and preparing them for a bright
                    future. Our experienced faculty and comprehensive curriculum ensure
                    that students receive a well-rounded education in a supportive
                    environment.
                </p>
            </section>
        </div>
    );
}
