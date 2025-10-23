"use client"

import React from 'react';
import "@/styles/introPage.css";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CustomEase } from 'gsap/all';
import { splittTextElements } from './helper';
import { useIsMobile } from '@/hooks/isMobile';

gsap.registerPlugin(ScrollTrigger, CustomEase);

export default function IntroPage() {
    const introRef = React.useRef<HTMLDivElement>(null);
    const isMobile = useIsMobile();
    React.useEffect(() => {
        window.scrollTo(0, 0);
        CustomEase.create("hop", ".8, 0, .3, 1");
        splittTextElements(".intro-title h1", "words, chars", true);
        splittTextElements('.outro-title h1');
        splittTextElements(".tag p", "words");

        gsap.set(
            [
                ".preloader .intro-title",
                ".preloader .outro-title",
            ],
            { opacity: 100 })
        gsap.set(".tags-overlay",
            { opacity: 100 })

        gsap.set(
            [
                ".split-overlay .intro-title .first-char span",
                ".split-overlay .outro-title .char span",
            ],
            { y: "0%" })
        gsap.set(".split-overlay .intro-title .first-char", {
            x: isMobile ? "7.5rem" : "18rem",
            y: isMobile ? "-1rem" : "-2.75rem",
            fontWeight: "900",
            scale: 0.75,
        })
        gsap.set(".split-overlay .outro-title .char", {
            x: isMobile ? "-1rem" : "-8rem",
            fontSize: isMobile ? "6rem" : "14rem",
            fontWeight: "500",
        })
        gsap.set("body", { overflow: "hidden" });

        const tl = gsap.timeline({ defaults: { ease: "hop" } });
        const tags = gsap.utils.toArray<HTMLElement>('.tag');
        tags.forEach((tag, index) => {
            tl.to(tag.querySelectorAll<HTMLElement>("p .word"),
                {
                    y: "0%",
                    duration: 0.75
                },
                0.5 * index * 0.1
            )
        })

        tl.to(".preloader .intro-title .char span", {
            y: "0%",
            duration: 0.75,
            stagger: 0.05,
        }, 0.5)
            .to(".preloader .intro-title .char:not(.first-char) span", {
                y: "100%",
                duration: 0.75,
                stagger: 0.05,
            })
            .to(".preloader .outro-title .char span", {
                y: "0%",
                duration: 0.75,
                stagger: 0.05,
            }, 3)
            .to(".preloader .intro-title .first-char", {
                x: isMobile ? "9rem" : "23.5rem",
                duration: 1,
            }, 3.5)
            .to(".preloader .outro-title .char", {
                x: isMobile ? "-1rem" : "-8rem",
                duration: 1,
            }, 3.5)
            .to(".preloader .intro-title .first-char", {
                x: isMobile ? "5.75rem" : "17rem",
                y: isMobile ? "-1.75rem" : "-4rem",
                fontWeight: "900",
                scale: 0.75,
                duration: 0.75,
            }, 4.5)
            .to(".preloader .outro-title .char", {
                x: isMobile ? "-1rem" : "-8rem",
                fontSize: isMobile ? "6rem" : "14rem",
                fontWeight: "500",
                duration: 0.75,
                onComplete: () => {
                    {
                        gsap.set(".preloader", {
                            clipPath: "polygon(0 0, 100% 0, 100% 50%, 0 50%)",
                        });
                        gsap.set(".split-overlay", {
                            clipPath: "polygon(0 50%, 100% 50%, 100% 100%, 0 100%)",
                        });
                    }
                }
            }, 4.5)
            .to("#app-body", {
                clipPath: "polygon(0 48%, 100% 48%, 100% 52%, 0 52%)",
                duration: 1,
            }, 5);

        tags.forEach((tag, index) => {
            tl.to(tag.querySelectorAll<HTMLElement>("p .word"),
                {
                    y: "100%",
                    duration: 0.75
                },
                5 + index * 0.1
            )
        });

        tl.to([".preloader", ".split-overlay"], {
            y: (i) => i === 0 ? "-50%" : "50%",
            duration: 1,
            onComplete: () => {
                {
                    if (introRef.current) {
                        document.body.removeChild(introRef.current);
                    }
                    gsap.set("body", { overflow: "auto" });
                }
            }
        }, 6)
            .to("#app-body", {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1,
            }, 6)
            .to("#app-body", {
                height: "auto",
            }, 7);

    }, []);
    return (
        <div ref={introRef} className='intro w-full h-[100dvh] fixed flex bg-[#0a0a0a] items-center justify-center font-mono font-bold' >
            <div className='preloader'>
                <div className='intro-title opacity-0'>
                    <h1 className='text-4xl mb-4'>AL AMEEN KNOWLEDGE CITY</h1>
                </div>
                <div className='outro-title opacity-0'>
                    <h1 className='text-4xl mb-4'>MS</h1>
                </div>
            </div>
            <div className='split-overlay'>
                <div className='intro-title'>
                    <h1 className='text-4xl mb-4'>AL AMEEN KNOWLEDGE CITY</h1>
                </div>
                <div className='outro-title'>
                    <h1 className='text-4xl mb-4'>MS</h1>
                </div>
            </div>
            <div className="tags-overlay opacity-0">
                <div className="tag tag-1">
                    <p>LEARN</p>
                </div>
                <div className="tag tag-2">
                    <p>BUILD</p>
                </div>
                <div className="tag tag-3">
                    <p>EARN</p>
                </div>
            </div>
        </div>
    )
}
