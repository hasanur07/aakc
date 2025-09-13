"use client";

import React from "react";

interface AnimatedButtonProps {
  label: string;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({ label }) => {
  return (
    <div className="relative overflow-hidden group">
      <span className="flex">
        {label.split("").map((char, i) => (
          <span
            key={i}
            className="relative inline-block overflow-hidden"
          >
            {/* Original char */}
            <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
              {char === " " ? "\u00A0" : char}
            </span>
            {/* Duplicate char */}
            <span className="block absolute left-0 top-full transition-transform duration-300 ease-out group-hover:-translate-y-full">
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ))}
      </span>
    </div>
  );
};

export default AnimatedButton;
