"use client";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
import { InfiniteMovingCardsDemo } from "./ReviewCards";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "Write",
    },
    {
      text: "with",
    },
    {
      text: "OpenScroll.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[60rem]">
      <p className="text-neutral-600 dark:text-neutral-200 text-[20px] sm:text-base mt-10rem">
      For every thought, a voice. For every voice, a reader.
      </p>
      <TypewriterEffectSmooth words={words} />
      <div
        className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button
          className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Read Articles
        </button>
        <button
          className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Write Articles
        </button>
      </div>
      <div className="mt-10">
        <InfiniteMovingCardsDemo/>
      </div>
    </div>
  );
}
