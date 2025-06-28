"use client";

import React from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
  return (
    <div
      className="h-[15rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
    </div>
  );
}

const testimonials = [
    {
      quote: "A perfect place to write freely and be read globally.",
      name: "Ananya Verma",
      title: "Content Creator",
    },
    {
      quote: "I found my writing voice here — and an audience too.",
      name: "Ravi Kapoor",
      title: "Freelance Writer",
    },
    {
      quote: "Clean, intuitive, and inspiring. Love the writing flow.",
      name: "Meera Joshi",
      title: "Tech Blogger",
    },
    {
      quote: "It's like Medium, but friendlier and more personal.",
      name: "Arjun Mehta",
      title: "Startup Founder",
    },
    {
      quote: "Reading and writing on this site feels effortless.",
      name: "Sara Fernandes",
      title: "Student & Writer",
    },
    {
      quote: "Exactly what new writers need — reach and respect.",
      name: "Dev Sharma",
      title: "Poetry Enthusiast",
    },
  ];
  