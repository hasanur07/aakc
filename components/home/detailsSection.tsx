import Image from "next/image";
import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@heroui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { StarIcon } from "@hugeicons/core-free-icons";

gsap.registerPlugin(ScrollTrigger);

export default function DetailsSection() {
    const contenerRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contenerRef.current) return;
        const element = contenerRef.current;

        // Pin the main container
        ScrollTrigger.create({
            trigger: element,
            start: "top top",
            end: "+=320%",
            scrub: true,
            pin: true,
        });

        const detailsContents = element.querySelectorAll(".details-container .details-content");
        gsap.set(detailsContents, { opacity: 0, pointerEvents: 'none' });
        gsap.set(detailsContents[0], { opacity: 1, pointerEvents: 'auto' });
        const images = element.querySelectorAll(".image-container .img");

        // hide all details except the first
        gsap.set(detailsContents, { opacity: 0 });
        gsap.set(detailsContents[0], { opacity: 1 });

        images.forEach((img, index) => {
            if (index === 0) return;

            const per = 100 / (images.length - 1); // e.g. 50% for 3 images
            const value = per * (index - 1);

            gsap.timeline({
                scrollTrigger: {
                    trigger: element.querySelector('.contener-inner') as Element,
                    start: () => `${window.innerHeight * 3 * (value / 100)} top`, // map to total scroll
                    end: () => `+=${window.innerHeight * 3 * (per / 100)}`,       // proportional duration
                    scrub: true,
                },
                onComplete: () => {
                    gsap.set(detailsContents[index - 1], { opacity: 1, y: 0, pointerEvents: 'none' });
                    gsap.to(detailsContents[index - 1], { opacity: 0, y: -100, duration: 0.25, pointerEvents: 'none' });
                    gsap.set(detailsContents[index], { y: 100 });
                    gsap.to(detailsContents[index], { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.25, pointerEvents: 'auto' });
                },
                onReverseComplete: () => {
                    gsap.set(detailsContents[index], { opacity: 1, y: 0, pointerEvents: 'none' });
                    gsap.to(detailsContents[index], { opacity: 0, y: 100, duration: 0.25, pointerEvents: 'none' });
                    gsap.set(detailsContents[index - 1], { y: -100 });
                    gsap.to(detailsContents[index - 1], { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.25, pointerEvents: 'auto' });
                },
            }).to(img, {
                height: "100%",
                top: "0%",
                ease: "none",
            });
        });


        return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    }, []);

    return (
        <div className="flex w-full h-[420vh] px-4 sm:px-8">
            <div ref={contenerRef} className="flex w-full h-[100vh]">
                <div className="contener-inner flex flex-col-reverse sm:flex-row relative w-full h-[calc(100vh-5.5rem)] sm:h-[calc(100vh-8.5rem)] rounded-4xl mt-18 sm:mt-22 mb-4 sm:mb-12 border border-gray-500 p-4 sm:p-8">
                    {/* Text Section */}
                    <div className="details-container flex relative w-full h-1/2 sm:w-1/2 sm:h-full">
                        <div className="details-content flex flex-col justify-center items-start h-full absolute left-0 top-0 pr-8 pt-4 sm:pt-0">
                            <div className="flex bg-black rounded-full p-2 text-white gap-1 sm:gap-2 items-center">
                                <HugeiconsIcon icon={StarIcon} size={14} />
                                <span className="text-[10px] sm:text-[12px] uppercase">Features</span>
                            </div>
                            <h2 className="text-lg sm:text-4xl font-bold my-2 sm:mb-6 sm:mt-4">
                                Discover Our School's Unique Features
                            </h2>
                            <p className="text-sm sm:text-lg mb-6">
                                At Al Ameen Knowledge City Missionary School, we pride ourselves on providing a nurturing environment that fosters academic excellence and personal growth.
                            </p>
                            <Button variant="solid" radius="full" color="primary">
                                Learn More
                            </Button>
                        </div>
                        <div className="details-content flex flex-col justify-center h-full absolute left-0 top-0 opacity-0 pr-8 items-start pt-4 sm:pt-0">
                            <div className="flex bg-black rounded-full p-2 text-white gap-1 sm:gap-2 items-center">
                                <HugeiconsIcon icon={StarIcon} size={14} />
                                <span className="text-[10px] sm:text-[12px] uppercase">Excellence</span>
                            </div>
                            <h2 className="text-lg sm:text-4xl font-bold my-2 sm:mb-6 sm:mt-4">
                                Explore Our Commitment to Excellence
                            </h2>
                            <p className="text-sm sm:text-lg mb-4">
                                We offer a comprehensive curriculum that integrates modern teaching methodologies with traditional values.
                            </p>
                            <Button variant="solid" radius="full" color="primary">
                                Learn More
                            </Button>
                        </div>
                        <div className="details-content flex flex-col justify-center h-full absolute left-0 top-0 opacity-0 pr-8 items-start pt-4 sm:pt-0">
                            <div className="flex bg-black rounded-full p-2 text-white gap-1 sm:gap-2 items-center">
                                <HugeiconsIcon icon={StarIcon} size={14} />
                                <span className="text-[10px] sm:text-[12px] uppercase">Community</span>
                            </div>
                            <h2 className="text-lg sm:text-4xl font-bold my-2 sm:mb-6 sm:mt-4">
                                Join a Community of Lifelong Learners
                            </h2>
                            <p className="text-sm sm:text-lg mb-4">
                                We are committed to nurturing lifelong learners equipped with skills and values to navigate an ever-changing world.
                            </p>
                            <Button variant="solid" radius="full" color="primary">
                                Learn More
                            </Button>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="flex relative sm:w-1/2 sm:h-full w-full h-1/2">
                        <div className="image-container flex relative w-full h-full rounded-2xl overflow-hidden">
                            <Image
                                src="/imgs/pexels-photo-32094622.jpeg"
                                className="img w-full h-full object-cover absolute inset-0"
                                alt="details image"
                                width={400}
                                height={600}
                            />
                            <Image
                                src="/imgs/pexels-photo-1181395.jpeg"
                                className="img w-full h-0 object-cover absolute top-full inset-0"
                                alt="details image"
                                width={400}
                                height={600}
                            />
                            <Image
                                src="/imgs/pexels-photo-3184328.jpeg"
                                className="img w-full h-0 object-cover absolute top-full inset-0"
                                alt="details image"
                                width={400}
                                height={600}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
