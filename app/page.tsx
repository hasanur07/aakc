"use client";

import AnimatedButton from "@/components/buttons/animatedButton";
import GallerySection from "@/components/home/gallerySection";
import { Button } from "@heroui/button";
import { ArrowRight02FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export default function Home() {
  return (
    <>
      <section className="flex flex-col h-[100svh] justify-center items-start -mt-16 gap-4 max-w-7xl pl-6">
        <div className="relative">
          <h1 className="text-3xl sm:text-5xl font-bold leading-12 sm:leading-16 relative">
            Welcome To<br />
            Al Ameen Knowledge City<br />
            Missionary School
          </h1>

          {/* Tag bubbles */}
          <div className="absolute top-1 sm:top-3 left-48 sm:left-76 px-4 py-2 rounded-full bg-yellow-500 text-black">
            <p>😃 Enjoy</p>
          </div>
          <div className="absolute top-24 sm:top-28 left-18 sm:left-40 px-4 py-2 rounded-full bg-green-500 mix-blend text-white">
            <p>📚 Learn</p>
          </div>
          <div className="absolute top-28 sm:top-auto sm:bottom-3 left-46 sm:left-auto sm:right-18 px-4 py-2 rounded-full bg-blue-600 text-white">
            <p>🛠️ Build</p>
          </div>
        </div>
        <Button variant="bordered" radius="full" color="default" size="lg" className="pr-1.5 pl-4 mt-2">
          <AnimatedButton label="Get Started" />
          <div className="bg-black rounded-full flex justify-center items-center w-12 h-9">
            <HugeiconsIcon
              icon={ArrowRight02FreeIcons}
              size={32}
              color="white"
            />
          </div>
        </Button>
      </section>
      <GallerySection />
      <section className="flex flex-col h-[50svh] justify-center items-start gap-4 max-w-7xl px-6">
        <h2 className="text-3xl font-semibold leading-10">
          Discover More About Us
        </h2>
        <p className="max-w-xl text-lg">
          Explore our programs, events, and community initiatives designed to
          foster growth and learning.
        </p>
        <Button variant="solid" radius="full" color="success" size="lg" className="pr-1.5 pl-4 mt-2">
          <AnimatedButton label="Learn More" />
          <div className="bg-white rounded-full flex justify-center items-center w-12 h-9">
            <HugeiconsIcon
              icon={ArrowRight02FreeIcons}
              size={32}
              color="black"
            />
          </div>
        </Button>
      </section>  
    </>
  );
}
