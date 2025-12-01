"use client";

import AnimatedButton from "@/components/buttons/animatedButton";
import About from "@/components/home/about";
import DetailsSection from "@/components/home/detailsSection";
import VerticalThreeColumnCarousel from "@/components/home/imageGrid";
import NoticeSection from "@/components/home/noticeSection";
import ThreeRowReviewCarousel from "@/components/home/review";
import { Button } from "@heroui/button";
import { ArrowRight02FreeIcons } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="flex relative h-[100vh] justify-between items-center -mt-16 gap-4 max-w-7xl px-6">
        <div className="flex flex-col gap-4 h-auto items-start">
          <div className="relative">
            <h1 className="text-[29px] sm:text-5xl font-bold leading-12 sm:leading-16 relative">
              Welcome To<br />
              Al Ameen Knowledge City<br />
              Missionary School
            </h1>

            {/* Tag bubbles */}
            <div className="absolute top-1 sm:top-3 left-48 sm:left-76 px-4 py-2 rounded-full bg-yellow-500 text-black">
              <p>😃 Enjoy</p>
            </div>
            <div className="absolute top-24 sm:top-26 left-18 sm:left-40 px-4 py-2 rounded-full bg-green-500 mix-blend text-white border-4 border-background dark:border-black">
              <p>📚 Learn</p>
            </div>
            <div className="absolute top-28 sm:top-auto sm:bottom-3 left-46 sm:left-auto sm:right-18 px-4 py-2 rounded-full bg-blue-600 text-white">
              <p>🛠️ Build</p>
            </div>
          </div>
          <Button variant="bordered" radius="full" color="default" size="lg" className="pr-1.5 pl-4 mt-2">
            <AnimatedButton label="Get Started" />
            <div className="bg-black dark:bg-white rounded-full flex justify-center items-center w-12 h-9">
              <HugeiconsIcon
                icon={ArrowRight02FreeIcons}
                size={32}
                className="text-white dark:text-black"
              />
            </div>
          </Button>
        </div>
        <div className="hidden md:flex">
          <Image
            src="/models/student-tr.png"
            alt="heart image"
            width={400}
            height={400}
          />
        </div>
      </section>
      <About />
      <DetailsSection />
      <VerticalThreeColumnCarousel />
      <NoticeSection />
      <ThreeRowReviewCarousel />
    </>
  );
}
