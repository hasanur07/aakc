"use client"

import { Button } from '@heroui/button'
import { ArrowRight02FreeIcons } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import React, { useEffect } from 'react'
import AnimatedButton from '../buttons/animatedButton'
import { splittTextElements } from '../intro/helper';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
    useEffect(() => {
        splittTextElements(".about-section .title");
        splittTextElements(".about-section .paragraph");
        gsap.set(".about-section .title .word", { overflow: "hidden" });
        gsap.set(".about-section .paragraph .word", { overflow: "hidden" });
        gsap.set(".about-section .title .word .char", { opacity: 0.2});
        gsap.set(".about-section .paragraph .word .char", { opacity: 0.2});
        gsap.to(".about-section .title .word .char",
            {
                opacity: 1,
                stagger: 0.2,
                duration: 2,
                scrollTrigger: {
                    trigger: ".about-section .title",
                    start: "top 90%",
                    end: "bottom 80%",
                    scrub: true,
                }
            }
        );
        gsap.to(".about-section .paragraph .word .char",
            {
                opacity: 1,
                stagger: 0.2,
                duration: 2,
                scrollTrigger: {
                    trigger: ".about-section .paragraph",
                    start: "top 80%",
                    end: "bottom 70%",
                    scrub: true,
                }
            }
        );
    }, []);

    return (
        <section className="about-section flex flex-col h-[100vh] justify-center items-start gap-4 max-w-7xl px-6 my-10 sm:my-0">
            <div className="flex flex-col gap-6 justify-center items-start">
                <div className="flex gap-2 text-sm px-3 py-2 rounded-full bg-gray-200">
                    🧑‍🎓
                    <h5>About Us</h5>
                </div>
                <h1 className="title max-w-xl text-3xl font-bold">
                    We are dedicated to providing quality education and fostering a love for learning.
                </h1>
                <p className="paragraph max-w-2xl text-lg">
                    At Al Ameen Knowledge City Missionary School, we believe in nurturing young minds and preparing them for a bright future. Our experienced faculty and comprehensive curriculum ensure that students receive a well-rounded education in a supportive environment.
                </p>
                <Button variant="solid" radius="full" color="success" size="lg" className="pr-1.5 pl-4 mt-2 bg-yellow-500">
                    <AnimatedButton label="Learn More" />
                    <div className="bg-white rounded-full flex justify-center items-center w-12 h-9">
                        <HugeiconsIcon
                            icon={ArrowRight02FreeIcons}
                            size={32}
                            color="black"
                        />
                    </div>
                </Button>
            </div>
        </section>
    )
}
