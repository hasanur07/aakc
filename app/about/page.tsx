"use client"
import { useEffect, useRef, useState } from "react";

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
      <div className="flex relative w-full h-screen justify-center items-center">
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
    </div>
  );
}

import React from "react";import { BlobReveal } from "./blob";

