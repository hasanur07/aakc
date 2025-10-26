"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactElement, useEffect, useRef } from "react";
import { NewLogo } from "../icons";
import gsap from "gsap";


export default function PageTransition({ children }: { children: ReactElement }) {
    const router = useRouter();
    const pathname = usePathname();
    const overlayRef = useRef<HTMLDivElement>(null);
    const logoOverlayRef = useRef(null);
    const logoRef = useRef<SVGSVGElement>(null);
    const blocksRef = useRef<HTMLDivElement[]>([]);
    const isTransitioning = useRef(false);

    useEffect(() => {
        const createBlock = () => {
            if (!overlayRef.current) {
                return;
            }
            overlayRef.current.innerHTML = "";
            blocksRef.current = [];

            for (let i = 0; i < 20; i++) {
                const block = document.createElement("div");
                block.className.add("flex-1 h-screen bg-[#222] scale-x-0 origin-left");
                overlayRef.current.appendChild(block);
                blocksRef.current.push(block);
            }
        };

        createBlock();

        gsap.set(blocksRef.current, { scaleX: 0, transformOrigin: "left" });

        if (logoRef.current) {
            const path = logoRef.current.querySelector("path");
            if (path) {
                const length = path.getTotalLength();
                gsap.set(path, {
                    strokeDasharray: length,
                    strokeDashoffset: length,
                    fill: "transparent",
                });
            }
        }

        revealPage();

        const handleRouteChange = (url: any) => {
            if (isTransitioning.current) return;
            isTransitioning.current = true;
            coverpage(url);
        }

        const links = document.querySelectorAll('a[href^="/"]');

        links.forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault();

                const anchor = e.currentTarget as HTMLAnchorElement;
                const href = anchor.href;
                const url = new URL(href).pathname;
                if (url != pathname) {
                    handleRouteChange(url);
                }
            });
        });

        return () => {
            links.forEach(link => {
                link.removeEventListener("click", handleRouteChange);
            })
        }

    }, [router, pathname]);

    const coverpage = (url: string) => {
        document.body.style.overflow = "hidden";
        const logoPath = logoRef.current?.querySelector("path");
        const tl = gsap.timeline({
            onComplete: () => { router.push(url) },
        });

        tl.to(blocksRef.current, {
            scaleX: 1,
            duration: 0.4,
            stagger: 0.02,
            ease: "power2.out",
            transformOrigin: "left",
        })
            .set(logoOverlayRef.current, { opacity: 1 }, "-=0.02")
            .set(logoRef.current?.querySelector("path")!, {
                strokeDashoffset: logoRef.current?.querySelector("path")?.getTotalLength()!,
                fill: "transparent",
            }, "-=0.25")
            .to(logoPath!, {
                strokeDashoffset: 0,
                duration: 2,
                ease: "power2.inOut",
            }, "-=0.5")
            .to(logoPath!, {
                fill: "#e3e4d8",
                duration: 1,
                ease: "power2.out"
            }, "-=0.5")
            .to(logoOverlayRef.current, {
                opacity: 0,
                duration: 0.25,
                ease: "power2.out"
            }, "-=0.5")
            ;
    };

    const revealPage = () => {
        gsap.set(blocksRef.current, { scaleX: 1, transformOrigin: "left" });

        gsap.to(blocksRef.current, {
            scaleX: 0,
            duration: 0.4,
            stagger: 0.02,
            ease: "power2.out",
            transformOrigin: "right",
            onComplete: () => {
                isTransitioning.current = false;
                document.body.style.overflow = "auto";
            }
        })
    }

    return (
        <>
            <div ref={overlayRef} className="fixed top-0 left-0 w-screen h-screen flex pointer-events-none z-[100]"></div>
            <div ref={logoOverlayRef} className="fixed top-0 left-0 w-screen h-[100dvh] z-[100] flex justify-center items-center bg-[#222] pointer-events-none opacity-0">
                <div className="w-[200px] h-[200px] flex justify-center items-center p-[20px]">
                    <NewLogo ref={logoRef} />
                </div>
            </div>
            {children}
        </>
    );
}