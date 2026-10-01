"use client";

import { useEffect } from "react";

// Keeps one WhatsApp call to action on screen at a time: while the hero's
// button is visible, elements marked `after-hero` (navbar button, floating
// button) stay hidden. Without JS they simply remain visible.
export function HeroCtaWatcher() {
  useEffect(() => {
    const target = document.getElementById("hero-cta");
    if (!target) return;
    const root = document.documentElement;
    // Set the initial state right away so the navbar button does not flash in.
    const rect = target.getBoundingClientRect();
    root.dataset.heroCta = rect.bottom > 72 && rect.top < window.innerHeight ? "visible" : "hidden";
    const observer = new IntersectionObserver(
      ([entry]) => {
        root.dataset.heroCta = entry.isIntersecting ? "visible" : "hidden";
      },
      { rootMargin: "-72px 0px 0px 0px" },
    );
    observer.observe(target);
    return () => {
      observer.disconnect();
      delete root.dataset.heroCta;
    };
  }, []);

  return null;
}
