"use client";

import React, { useState, useRef, useEffect } from "react";

interface AnimatedButtonProps {
  label: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ label }) => {
  const [active, setActive] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = () => setActive(true);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setActive(false);
      }
    };

    // Listen for both mouse and touch events
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={buttonRef}
      className={`relative overflow-hidden group ${active ? "hovered" : ""}`}
      onTouchStart={handleTouchStart} // sets active true
    >
      <span className="flex">
        {label.split("").map((char, i) => (
          <span key={i} className="relative inline-block overflow-hidden">
            {/* Original char */}
            <span
              className={`block transition-transform duration-300 ease-out ${
                active ? "-translate-y-full" : "group-hover:-translate-y-full"
              }`}
            >
              {char === " " ? "\u00A0" : char}
            </span>
            {/* Duplicate char */}
            <span
              className={`block absolute left-0 top-full transition-transform duration-300 ease-out ${
                active ? "-translate-y-full" : "group-hover:-translate-y-full"
              }`}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ))}
      </span>
    </div>
  );
};

export default AnimatedButton;
