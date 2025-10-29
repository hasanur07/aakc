import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const BlobReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    const container = containerRef.current;
    if (!path || !container) return;

    // Initial small blob
    gsap.set(path, { attr: { transform: "translate(0.5 0.5) scale(0.002)" } });

    // Animate blob expansion
    gsap.to(path, {
      attr: { transform: "translate(0.5 0.5) scale(0.02)", d: "M22.3,-25.1 L29.6,-20.4 L36.9,-14.1 L37.6,-7.1 L38.3,0 L32.6,7.7 L27.4,15.2 L22.3,22.6 L17.9,29.7 L11.1,33.5 L4.3,37.3 L-4.8,37.8 L-13.6,35.4 L-22.4,33.1 L-30.9,27.9 L-34.5,20.5 L-38,13.1 L-36.6,3.5 L-34.8,-6.1 L-33,-15.6 L-31,-25 L-25.1,-30 L-19.2,-34.9 L-9.6,-35.5 L-1.1,-34.2 L7.4,-32.9 L14.9,-29.8 L22.3,-25.1Z" },
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: container,
        start: "-20% top",
        end: "120% bottom",
        scrub: true,
      },
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex h-screen relative w-full justify-center items-center"
    >
      {/* The blob clipped section */}
      <div
        className="absolute top-0 left-0 w-full h-screen bg-black"
        style={{
          clipPath: "url(#blobClip)",
          WebkitClipPath: "url(#blobClip)",
        }}
      />

      {/* Hidden SVG clipPath definition */}
      <svg width="0" height="0">
        <defs>
          <clipPath id="blobClip" clipPathUnits="objectBoundingBox">
            <path
              ref={pathRef}
              d="M22.3,-25.1C29.6,-20.4,36.9,-14.1,37.6,-7.1C38.3,0,32.6,7.7,27.4,15.2C22.3,22.6,17.9,29.7,11.1,33.5C4.3,37.3,-4.8,37.8,-13.6,35.4C-22.4,33.1,-30.9,27.9,-34.5,20.5C-38,13.1,-36.6,3.5,-34.8,-6.1C-33,-15.6,-31,-25,-25.1,-30C-19.2,-34.9,-9.6,-35.5,-1.1,-34.2C7.4,-32.9,14.9,-29.8,22.3,-25.1Z"
              transform="translate(0.5 0.5) scale(0.002)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
