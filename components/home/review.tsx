"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const reviewsRow1 = [
  { name: "Hasanur M", role: "Developer", text: "Excellent school!" },
  { name: "Sara K", role: "Designer", text: "Great teachers!" },
  { name: "John D", role: "Engineer", text: "Highly recommend!" },
];

const reviewsRow2 = [
  { name: "Jane S", role: "Teacher", text: "Supportive staff!" },
  { name: "Alex P", role: "Parent", text: "My child loves it!" },
  { name: "Lina R", role: "Student", text: "Fun and engaging!" },
];

const reviewsRow3 = [
  { name: "Tom H", role: "Parent", text: "Amazing environment!" },
  { name: "Lucy W", role: "Student", text: "Best experience ever!" },
  { name: "Mark T", role: "Teacher", text: "Highly professional!" },
];

const ReviewRow = ({
  reviews,
  direction,
  duration,
}: {
  reviews: typeof reviewsRow1;
  direction: "left" | "right";
  duration: number;
}) => {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.gap = "1rem";
    wrapper.style.position = "absolute";
    wrapper.style.top = "0";
    wrapper.style.left = "0";
    wrapper.style.height = "100%";

    // Move original children
    Array.from(row.children).forEach((child) => wrapper.appendChild(child));
    row.innerHTML = "";
    row.appendChild(wrapper);

    // Clone for seamless scroll
    const clone = wrapper.cloneNode(true) as HTMLDivElement;
    wrapper.appendChild(clone);

    const totalWidth = wrapper.scrollWidth / 2;

    gsap.set(wrapper, { x: direction === "left" ? 0 : -totalWidth });
    gsap.to(wrapper, {
      x: direction === "left" ? -totalWidth : 0,
      ease: "none",
      duration,
      repeat: -1,
    });
  }, [direction, duration]);

  return (
    <div ref={rowRef} className="relative w-full overflow-hidden h-48 mb-4">
      {reviews.map((review, i) => (
        <div
          key={i}
          className="flex flex-col justify-between w-80 min-w-[20rem] h-48 rounded-2xl bg-white border border-black/10 p-4 flex-shrink-0"
        >
          <p className="opacity-70">{review.text}</p>
          <div className="flex flex-col leading-tight mt-2">
            <h5 className="font-semibold">{review.name}</h5>
            <p className="opacity-50 text-sm">{review.role}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function ThreeRowReviewCarousel() {
  return (
    <section className="flex flex-col gap-4 w-full">
      <ReviewRow reviews={reviewsRow1} direction="left" duration={20} />
      <ReviewRow reviews={reviewsRow2} direction="right" duration={25} />
      <ReviewRow reviews={reviewsRow3} direction="left" duration={22} />
    </section>
  );
}
