"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button } from "@heroui/button";

// Extended sample reviews
const reviewsRow1 = [
  { name: "Hasanur M", role: "Developer @doclet.app", text: "Excellent school! Supportive staff and innovative teaching methods." },
  { name: "Sara K", role: "Designer @nothing", text: "Great teachers! My child enjoys every class." },
  { name: "John D", role: "Engineer @aws", text: "Highly recommend! The environment is very nurturing." },
  { name: "Emma L", role: "Parent of RK", text: "Wonderful community and activities for kids." },
  { name: "Oliver P", role: "Student @aakc", text: "Fun and interactive lessons!" },
];

const reviewsRow2 = [
  { name: "Jane S", role: "Teacher @aakc", text: "Supportive staff! Collaboration is excellent here." },
  { name: "Alex P", role: "Parent OF SM", text: "My child loves it! Great facilities and care." },
  { name: "Lina R", role: "Student @JISSP", text: "Fun and engaging! Always excited to come." },
  { name: "Mia C", role: "Parent", text: "Teachers are professional and friendly." },
  { name: "Ethan K", role: "Student", text: "Best experience ever! Learned so much." },
];

const reviewsRow3 = [
  { name: "Tom H", role: "Parent of tg", text: "Amazing environment! Very safe and clean." },
  { name: "Lucy W", role: "Student @aakc", text: "Best experience ever! Highly recommend." },
  { name: "Mark T", role: "Teacher @aakcms", text: "Highly professional! Great mentorship." },
  { name: "Sophia N", role: "Parent", text: "Caring staff and creative programs." },
  { name: "Daniel R", role: "Student @jis", text: "I love the projects and teamwork!" },
];

interface ReviewRowProps {
  reviews: typeof reviewsRow1;
  direction: "left" | "right";
  duration: number;
}

const ReviewRow: React.FC<ReviewRowProps> = ({ reviews, direction, duration }) => {
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = rowRef.current;
    if (!wrapper) return;

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
    <div className="relative w-full overflow-hidden py-4 h-46">
      <div
        ref={rowRef}
        className="flex gap-2 absolute top-0 left-0 h-full"
      >
        {[...reviews, ...reviews].map((review, i) => (
          <div
            key={i}
            className="flex flex-col justify-between w-64 sm:w-72 h-46 rounded-2xl bg-white border border-black/10 p-4 flex-shrink-0"
          >
            <p className="opacity-70">{review.text}</p>
            <div className="flex flex-col leading-tight mt-2">
              <h5 className="font-semibold">{review.name}</h5>
              <p className="opacity-50 text-sm">{review.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ThreeRowReviewCarousel() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <section className="flex flex-col pt-16 rounded-b-full overflow-hidden relative w-full">
        <div className="flex flex-col justify-center items-center z-20">
          <p className="text-blue-500">Wall Of Love</p>
          <h5 className="text-4xl font-semibold text-center">Parents Love Our AAKC</h5>
          <span className="w-[38rem] text-center mt-2 opacity-55">We've been blown away by the ongoing support from our incredeble parents. Thy inspired us every day, every moment.</span>
        </div>
        <div className="flex flex-col gap-2 w-full mt-16">
          <ReviewRow reviews={reviewsRow1} direction="left" duration={30} />
          <ReviewRow reviews={reviewsRow2} direction="right" duration={30} />
          <ReviewRow reviews={reviewsRow3} direction="left" duration={10} />
        </div>
        <div className="flex absolute top-0 left-0 pb-16 w-full h-full rounded-b-full bg-[radial-gradient(circle,rgba(0,0,255,0)_0%,rgba(239,246,255,1)_70%)]"></div>
      </section>
      <div className="flex w-full h-10 bg-background -mt-10 z-10 blur-xl"></div>
      <Button
      size="sm"
      radius="full"
      >
        View Wall Of Love
      </Button>
    </div>
  );
}
