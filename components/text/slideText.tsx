import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SlideText({ text, className, ...props }: { text: string, className?: string, [key: string]: any }) {
    const textRef = React.useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!textRef.current) return;
        const element = textRef.current;
        gsap.set(element, { y: "100%" });
        ScrollTrigger.create({
            trigger: element,
            start: "top 90%",
            end: "bottom 10%",
            scrub: true,
            onEnter: () => {
                gsap.to(element, {
                    y: "0%",
                    delay: 0.1,
                    duration: 1,
                    ease: "power3.out",
                });
            },
            onLeaveBack: () => {
                gsap.to(element, {
                    y: "100%",
                    delay: 0.1,
                    duration: 1,
                    ease: "power3.out",
                });
            },
            onLeave: () => {
                gsap.to(element, {
                    y: "-100%",
                    delay: 0.1,
                    duration: 1,
                    ease: "power3.out",
                });
            },
            onEnterBack: () => {
                gsap.to(element, {
                    y: "0%",
                    delay: 0.1,
                    duration: 1,
                    ease: "power3.out",
                });
            },
        });
    }, []);
    return (
        <div className={`${className} overflow-hidden`} {...props}>
            <span ref={textRef} className="block">{text}</span>
        </div>
    )
}
