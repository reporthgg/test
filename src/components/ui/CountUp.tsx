"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

function subscribeMotion(callback: () => void): () => void {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// Анимированный счётчик: считает от 0 до value, когда попадает в вьюпорт.
// Уважает prefers-reduced-motion (тогда сразу показывает финальное значение).
export default function CountUp({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 1600,
  className = "",
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(0);
  const done = useRef(false);
  const reduce = useSyncExternalStore(subscribeMotion, getReducedMotion, () => false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    let animationFrame = 0;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !done.current) {
            done.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              // easeOutExpo
              const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
              setDisplay(value * eased);
              if (p < 1) animationFrame = requestAnimationFrame(tick);
              else setDisplay(value);
            };
            animationFrame = requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [value, duration, reduce]);

  const formatted = (reduce ? value : display).toLocaleString("ru-RU", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
