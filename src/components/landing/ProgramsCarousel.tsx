"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import styles from "./LandingPrograms.module.css";

type ProgramsCarouselProps = {
  children: ReactNode;
  label: string;
  previousLabel: string;
  nextLabel: string;
};

export default function ProgramsCarousel({
  children,
  label,
  previousLabel,
  nextLabel,
}: ProgramsCarouselProps): ReactNode {
  const trackRef = useRef<HTMLDivElement>(null);
  const trackId = useId();
  const [bounds, setBounds] = useState({ start: true, end: false });

  function updateBounds(): void {
    const track = trackRef.current;
    if (!track) return;
    const start = track.scrollLeft <= 1;
    const end = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
    setBounds((current) =>
      current.start === start && current.end === end ? current : { start, end },
    );
  }

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(updateBounds);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  function move(direction: -1 | 1): void {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({
      left: direction * Math.min(track.clientWidth, 460),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <div className={styles.carousel}>
      <div
        id={trackId}
        ref={trackRef}
        className={styles.testTrack}
        aria-label={label}
        role="region"
        tabIndex={0}
        onScroll={updateBounds}
      >
        {children}
      </div>
      <div className={styles.carouselControls}>
        <button
          type="button"
          className={styles.previous}
          aria-label={previousLabel}
          aria-controls={trackId}
          disabled={bounds.start}
          onClick={() => move(-1)}
        >
          <Image src="/landing/programs/chevron-white.svg" alt="" width={30} height={30} />
        </button>
        <button
          type="button"
          className={styles.next}
          aria-label={nextLabel}
          aria-controls={trackId}
          disabled={bounds.end}
          onClick={() => move(1)}
        >
          <Image src="/landing/programs/chevron-blue.svg" alt="" width={30} height={30} />
        </button>
      </div>
    </div>
  );
}
