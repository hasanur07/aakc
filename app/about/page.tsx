"use client"
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(50);
  const text = "ABOUT AAKC";

  const setSize = () => {
    if (!containerRef.current) return;
    const { width } = containerRef.current.getBoundingClientRect();
    const newFontSize = width / (text.length / 1.5);
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
    <div ref={containerRef} className="flex flex-col w-full">
      <h1
        className="font-mono font-bold text-center"
        style={{
          fontSize,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </h1>
      <div className="flex w-full">
        <AnimatedDiv />
      </div>
      <div className="flex flex-col w-full min-h-screen items-start px-6 justify-center">
        <p className="text-[10px]">OUR VISION</p>
        <h1 className="font-extrabold text-5xl uppercase mt-2">DELIVER SKILL-BASED<br />EDUCATION</h1>
        <div className="flex w-full h-[50vh]"></div>
        <span className="text-[14px] mt-2 max-w-sm tracking-widest leading-tight">
          We aim to provide students with practical skills that prepare them for
          real-world challenges, ensuring they are job-ready upon graduation.
        </span>
      </div>
      <div className="flex flex-col w-full min-h-screen items-center text-center px-6 justify-center">
        <p className="text-[10px]">OUR MISSION</p>
        <h1 className="font-extrabold text-5xl uppercase mt-2 max-w-2xl">WE BUILD FUTURE LEADERS, INNOVATORS, AND ENTREPRENEURS</h1>
        <p className="text-[14px] mt-6 max-w-sm tracking-widest leading-tight">
          We strive to cultivate the next generation of leaders by providing
          them with the tools and resources they need to succeed in a rapidly
          changing world.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full h-[70vh] items-center px-4 sm:px-22 justify-center">
        <div className="flex flex-col items-start p-4 w-full rounded-md border">
          <h1 className="text-5xl font-extrabold">JOIN<br />AAKC</h1>
          <p className="mt-2 tracking-widest">Become a part of our community and start your journey towards a successful career.</p>
          <Button variant="solid" color="primary" className="mt-4 bg-black rounded-full text-[12px] p-4 h-8">Apply Now</Button>
        </div>
        <div className="flex flex-col items-start p-4 w-full rounded-md border">
          <h1 className="text-5xl font-extrabold">GET IN<br />TOUCH</h1>
          <p className="mt-2 tracking-widest">We'd love to hear from you! Reach out with any questions or inquiries.</p>
          <Button variant="solid" color="primary" className="mt-4 bg-black rounded-full text-[12px] p-4 h-8">Contact Us</Button>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
const AnimatedDiv: React.FC = () => {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ScrollTrigger.create({
      trigger: ".animated-div",
      start: "top 20%",
      end: "bottom 75%",
      scrub: true,
      onUpdate: (e) => {
        const progress = e.progress; // 0 → 1

        if (boxRef.current) {
          const skew = -20 + progress * 20;      // -20deg → 0deg
          const rotateX = 30 - progress * 30;    // 30deg → 0deg
          const rotateY = 20 - progress * 20;    // 20deg → 0deg
          const translateX = 15 - progress * 15; // 15% → 0%

          const widthPercent = 60 + progress * 40;  // 60% → 100%
          const heightPercent = 70 + progress * 30; // 70% → 100%

          boxRef.current.style.width = `${widthPercent}%`;
          boxRef.current.style.height = `${heightPercent}%`;
          boxRef.current.style.transform = `
            skew(${skew}deg)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateX(${translateX}%)
          `;

          // Keep the image visually flat
          const img = boxRef.current.querySelector("img") as HTMLImageElement;
          if (img) {
            // inverse of the box transform
            const invSkew = -skew;
            const invRotateX = -rotateX;
            const invRotateY = -rotateY;
            const invTranslateX = -translateX;

            const imageScale = 1.5 - progress * 0.5; // 1.5 → 1.0
            img.style.transform = `
              skew(${invSkew}deg)
              rotateX(${invRotateX}deg)
              rotateY(${invRotateY}deg)
              translateX(${invTranslateX}%)
              scale(${imageScale})
            `;
          }
        }
      },
    });
  }, []);

  return (
    <div
      className="animated-div flex w-full h-screen justify-center items-center"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1200px",
      }}
    >
      <div
        ref={boxRef}
        className="flex w-[60%] h-[70%] bg-black rounded-[15px] overflow-hidden"
        style={{
          transform: "skew(-20deg) rotateX(30deg) rotateY(20deg) translateX(15%)",
        }}
      >
        <img
          src="https://images.pexels.com/photos/34266109/pexels-photo-34266109.jpeg"
          alt="About Hero"
          className="object-cover w-full h-full"
          style={{
            transform: "skew(20deg) rotateX(-30deg) rotateY(-20deg) translateX(-15%) scale(1.5)",
            transformOrigin: "center center",
          }}
        />
      </div>
    </div>
  );
};
