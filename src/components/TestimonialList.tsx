"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import { SampleBadge } from "./ui/Heading";

export type Story = { quote: string; name: string; role: string };

type Labels = { title: string; badge: string; disclaimer: string; previous: string; next: string; region: string };

// One compact row of short cards (1 on phones, 2 on tablets, 3 on desktop).
// Native horizontal scroll with snap, so touch swipe and keyboard scrolling
// work; the two arrow buttons page through it for mouse users.
export function TestimonialList({ stories, labels }: { stories: Story[]; labels: Labels }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function update() {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  function page(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: direction * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
  }

  const arrow =
    "flex size-14 items-center justify-center rounded-full border-2 border-ink bg-bg text-ink transition-colors hover:bg-ink hover:text-bg disabled:cursor-default disabled:border-rule disabled:text-rule disabled:hover:bg-bg";

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 id="testimonial-label" className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
            {labels.title}
          </h2>
          {/* Invented stories: say so plainly, here and on every card. */}
          <p className="mt-1 text-base text-ink-soft">{labels.disclaimer}</p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button type="button" onClick={() => page(-1)} disabled={atStart} aria-label={labels.previous} title={labels.previous} className={arrow}>
            <CaretLeft size={24} weight="bold" aria-hidden="true" />
          </button>
          <button type="button" onClick={() => page(1)} disabled={atEnd} aria-label={labels.next} title={labels.next} className={arrow}>
            <CaretRight size={24} weight="bold" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul
        ref={trackRef}
        onScroll={update}
        tabIndex={0}
        aria-label={labels.region}
        className="mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [&::-webkit-scrollbar]:hidden"
      >
        {stories.map((story) => (
          <li
            key={story.name}
            className="w-[85%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
          >
            <figure className="flex h-full flex-col items-start rounded-2xl bg-bg p-6">
              <SampleBadge label={labels.badge} />
              <blockquote className="mt-3 text-lg leading-relaxed text-ink">“{story.quote}”</blockquote>
              <figcaption className="mt-auto pt-4 text-base">
                <span className="block font-semibold text-ink">{story.name}</span>
                <span className="text-ink-soft">{story.role}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </>
  );
}
