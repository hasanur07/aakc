"use client"
import { useEffect, useRef, useState } from "react";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(50);
  const text = "ABOUT AAKC";

  const setSize = () => {
    if (!containerRef.current) return;
    const { width } = containerRef.current.getBoundingClientRect();
    const newFontSize = width / (text.length * 1.5); // adjust multiplier for fit
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
        style={{
          fontSize,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </h1>
    </div>
  );
}