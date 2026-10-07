"use client";

import Image from "next/image";
import {
  useEffect,
  useEffectEvent,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactElement,
} from "react";
import type { Locale } from "@/i18n/config";
import { LeadButton } from "@/components/landing/LandingForms";
import { campsHeroContent, campsSlideIds, getCampsSlideIndex, type CampsSlideIndex } from "./hero-content";
import styles from "./CampsHero.module.css";

const AUTOPLAY_INTERVAL_MS = 10_000;
const assetPath = "/camps/hero/";

type FrameColor = "blue" | "pink" | "green" | "gold" | "rose";
type BorderPatch =
  | readonly [FrameColor, string]
  | readonly [FrameColor, number, number, number, number];
type PhotoShape = "landscape" | "portrait";
type Photo = {
  src: string;
  nodeId: string;
  shape: PhotoShape;
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
  imageFit?: "cover" | "fill";
  imageHeight?: number;
};

// These rectangles are the original Figma colour layers, clipped by its SVG masks.
const desktopLandscapeBorder: readonly BorderPatch[] = [
  ["blue", "-33.17px 598.8px 438.11px -17.03px"],
  ["blue", "413.42px 465.1px -8.48px 116.66px"],
  ["blue", "-33.17px 106px 438.11px 475.76px"],
  ["blue", "413.42px -12.96px -8.48px 594.73px"],
  ["pink", "-33.17px 465.1px 438.11px 111.56px"],
  ["pink", "413.42px 593.7px -8.48px -17.03px"],
  ["pink", "-17.09px -13.3px 422.03px 589.97px"],
  ["pink", "411.45px 103.77px -6.5px 472.9px"],
  ["green", "-33.17px 398.77px 341.81px 245.26px"],
  ["green", "240.7px 664.45px 49.62px -28.32px"],
  ["green", "38.71px -29.27px 251.61px 665.39px"],
  ["green", "324.96px 230.46px -34.64px 363.75px"],
  ["gold", "83.11px 439.43px 224.35px 204.59px"],
  ["gold", "144.82px 661.06px 230.58px -17.03px"],
  ["gold", "137.88px -29.18px 190.91px 673.2px"],
  ["gold", "423.32px 334.81px -47.92px 309.22px"],
  ["rose", "303.38px 398.77px -8.48px 245.26px"],
  ["rose", "-127.13px 207.99px 422.03px 304.25px"],
  ["rose", "33.17px 661.06px 326.47px -17.03px"],
  ["rose", "275.26px -25.46px 55.2px 673.49px"],
];

const desktopPortraitBorder: readonly BorderPatch[] = [
  ["blue", -24.58, -47.86, 185.554, 95.719],
  ["blue", 168.34, 581.99, 185.554, 95.719],
  ["pink", 160.98, -47.86, 192.917, 95.719],
  ["pink", -24.58, 581.99, 192.917, 95.719],
  ["green", 353.89, -47.86, 95.719, 234.684],
  ["green", -24.58, 347.31, 95.719, 234.684],
  ["gold", 353.89, 186.82, 95.719, 236.383],
  ["gold", -24.58, 208.96, 95.719, 138.351],
  ["rose", 353.89, 423.21, 95.719, 254.505],
  ["rose", -24.58, 47.86, 95.719, 161.099],
];

const mobileLandscapeBorder: readonly BorderPatch[] = [
  ["blue", -8.54, -16.89, 78.793, 33.783],
  ["blue", 58.47, 210.54, 82.193, 33.783],
  ["blue", 238.43, -16.89, 64.446, 33.783],
  ["blue", 298.05, 204.97, 64.446, 39.361],
  ["pink", 55.91, -16.89, 67.003, 33.783],
  ["pink", -8.54, 210.54, 81.748, 33.783],
  ["pink", 295.66, -8.7, 67.003, 33.783],
  ["pink", 236.14, 209.54, 76.606, 33.783],
  ["green", 107.78, -16.89, 48.375, 82.83],
  ["green", -14.2, 122.58, 95.348, 122.701],
  ["green", 333.46, 19.71, 37.205, 92.159],
  ["green", 182.29, 165.49, 62.43, 92.159],
  ["gold", 102.53, 42.33, 33.245, 83.429],
  ["gold", -8.54, 73.75, 33.245, 56.695],
  ["gold", 337.38, 70.22, 33.245, 72.568],
  ["gold", 154.96, 215.59, 33.245, 48.83],
  ["rose", 110.69, 154.5, 91.871, 89.825],
  ["rose", 152.48, -64.74, 99.286, 89.825],
  ["rose", -8.54, 12.65, 33.245, 68.239],
  ["rose", 337.52, 140.18, 31.239, 71.715],
];

const mobilePortraitBorder: readonly BorderPatch[] = [
  ["blue", -14.43, -28.18, 108.972, 61.755],
  ["blue", 98.86, 342.65, 108.972, 56.354],
  ["pink", 87.6, -28.18, 120.235, 56.354],
  ["pink", -14.43, 335.64, 113.296, 63.365],
  ["green", 207.83, -28.18, 56.214, 142.598],
  ["green", -14.44, 199.89, 56.214, 142.754],
  ["gold", 207.83, 109.99, 56.214, 139.171],
  ["gold", -14.43, 111.74, 56.214, 92.737],
  ["rose", 207.83, 244.31, 56.214, 154.693],
  ["rose", -14.43, 28.18, 56.214, 94.847],
];

const desktopPhotos: readonly (readonly Photo[])[] = [
  [
    { src: "campus-shanghai.png", nodeId: "327:980", shape: "portrait", x: 805, y: 404, width: 419.706, height: 629.559, angle: 1.86 },
    { src: "campus-disneyland.png", nodeId: "327:956", shape: "landscape", x: 100, y: 541, width: 710.363, height: 517.283, angle: -1.61, imageFit: "fill" },
  ],
  [
    { src: "winter-london.png", nodeId: "367:3584", shape: "portrait", x: 819, y: 466, width: 419.706, height: 629.559, angle: 1.86 },
    { src: "winter-new-york.jpg", nodeId: "367:3600", shape: "landscape", x: 100, y: 541, width: 710.363, height: 517.283, angle: -1.61 },
  ],
  [
    { src: "summer-student.png", nodeId: "327:1122", shape: "portrait", x: 816, y: 476, width: 419.706, height: 585.771, angle: 1.86, imageHeight: 570.744 },
    { src: "summer-new-york.png", nodeId: "327:1138", shape: "landscape", x: 100.43, y: 592, width: 710.363, height: 468.802, angle: -1.5 },
  ],
];

// Mobile reverses the stacking and uses different crops, sizes and image slots.
const mobilePhotos: readonly (readonly Photo[])[] = [
  [
    { src: "mobile-campus-shanghai.png", nodeId: "401:1244", shape: "landscape", x: 161.2, y: 114.21, width: 356, height: 240, angle: 1.75, imageFit: "fill" },
    { src: "mobile-campus-disneyland.png", nodeId: "401:1268", shape: "portrait", x: -14.6, y: 0, width: 246.484, height: 370.652, angle: -3.06 },
  ],
  [
    { src: "mobile-winter-london.png", nodeId: "409:2753", shape: "landscape", x: 150, y: 104.6, width: 326.017, height: 219.787, angle: 1.75, imageFit: "fill" },
    { src: "winter-new-york.jpg", nodeId: "409:2777", shape: "portrait", x: -17, y: 0, width: 225.725, height: 339.435, angle: -3.06 },
  ],
  [
    { src: "summer-new-york.png", nodeId: "409:2838", shape: "landscape", x: 144.58, y: 97.44, width: 303.725, height: 204.759, angle: 1.75 },
    { src: "summer-student.png", nodeId: "409:2862", shape: "portrait", x: -11, y: 0, width: 210.29, height: 316.226, angle: -3.06 },
  ],
];

const mobileBadgeSizes = [
  [39.7878, 67.3605],
  [36.4368, 61.6873],
  [33.9454, 57.4694],
] as const;

function FramedPhoto({ photo, mobile, current }: { photo: Photo; mobile: boolean; current: CampsSlideIndex }): ReactElement {
  const portrait = photo.shape === "portrait";
  const angle = photo.angle * Math.PI / 180;
  const scale = mobile ? photo.width / (portrait ? 246.484 : 356) : 1;
  const border = mobile
    ? portrait ? mobilePortraitBorder : mobileLandscapeBorder
    : portrait ? desktopPortraitBorder : desktopLandscapeBorder;
  const maskName = mobile
    ? `mobile-${campsSlideIds[current]}-${photo.shape}-mask.svg`
    : `desktop-${!portrait && current === 2 ? "summer-" : ""}${photo.shape}-mask.svg`;
  const maskHeight = mobile ? photo.height : portrait ? 629.559 : current === 2 ? 469.265 : 517.265;
  const badgeSize = mobile ? mobileBadgeSizes[current] : [68.5857, 116.059];
  const frameStyle: CSSProperties = {
    width: photo.width,
    height: photo.height,
    transform: `rotate(${photo.angle}deg)`,
    borderRadius: mobile ? (portrait ? 18.533 : 20) * scale : portrait ? 26.232 : 34.652,
  };

  return (
    <div
      className={`${styles.photo} ${mobile ? styles.mobilePhoto : styles.desktopPhoto} ${portrait === mobile ? styles.shadow : ""}`}
      data-node-id={photo.nodeId}
      style={{
        left: mobile ? `calc((100% - 390px) / 2 + ${photo.x}px)` : photo.x - 100,
        top: photo.y,
        width: photo.width * Math.cos(angle) + photo.height * Math.abs(Math.sin(angle)),
        height: photo.height * Math.cos(angle) + photo.width * Math.abs(Math.sin(angle)),
      }}
    >
      <div className={styles.photoFrame} style={frameStyle}>
        <Image
          src={`${assetPath}${photo.src}`}
          alt=""
          fill
          sizes={`${Math.ceil(photo.width)}px`}
          className={styles.photoImage}
          style={{
            objectFit: photo.imageFit ?? "cover",
            objectPosition: photo.imageFit === "fill" ? "bottom" : "center",
            height: photo.imageHeight ?? "100%",
            transform: !mobile && portrait ? "rotate(-1.41deg)" : undefined,
            top: mobile && !portrait ? 1.26 * scale : 0,
            left: mobile && !portrait ? -0.25 * scale : 0,
          }}
        />
        {portrait && (
          <Image
            src={`${assetPath}${mobile ? `mobile-${campsSlideIds[current]}-badge.svg` : "desktop-badge.svg"}`}
            width={badgeSize[0]}
            height={badgeSize[1]}
            alt=""
            className={styles.badge}
            style={{ left: mobile ? 180.84 * scale : 309.89, top: mobile ? 1.7 * scale : 5.23 }}
          />
        )}
        <div
          className={styles.frameBorder}
          style={{ maskImage: `url("${assetPath}${maskName}")`, height: maskHeight }}
        >
          {border.map((patch, index) => (
            <span
              key={index}
              className={styles.borderPatch}
              style={{
                backgroundColor: `var(--frame-${patch[0]})`,
                ...(patch.length === 2
                  ? { inset: patch[1] }
                  : { left: patch[1] * scale, top: patch[2] * scale, width: patch[3] * scale, height: patch[4] * scale }),
              }}
            />
          ))}
        </div>
        {portrait && (
          <span
            className={styles.brandMark}
            style={{
              left: mobile ? 185.68 * scale : 318.47,
              top: mobile ? 4.59 * scale : 7.87,
              width: mobile ? 29.979 * scale : 51.418,
              height: mobile ? 49.621 * scale : 85.108,
            }}
          >
            <Image src={`${assetPath}brand-mark.png`} alt="" width={4096} height={4096} sizes="86px" />
          </span>
        )}
      </div>
    </div>
  );
}

function subscribeMotion(callback: () => void): () => void {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function CampsHero({ locale }: { locale: Locale }): ReactElement {
  const text = campsHeroContent[locale];
  const [current, setCurrent] = useState<CampsSlideIndex>(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const reducedMotion = useSyncExternalStore(subscribeMotion, getReducedMotion, () => true);
  const heroRef = useRef<HTMLElement>(null);
  const touchRef = useRef<{ x: number; y: number } | null>(null);
  const slide = text.slides[current];
  const motionPaused = paused || hovered || focused || reducedMotion || !inView || !pageVisible;
  const advance = useEffectEvent(() => setCurrent((index) => getCampsSlideIndex(index + 1)));
  const updateVisibility = useEffectEvent(() => {
    setPageVisible(heroRef.current?.ownerDocument.visibilityState !== "hidden");
  });

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const owner = hero.ownerDocument;
    updateVisibility();
    owner.addEventListener("visibilitychange", updateVisibility);
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(hero);
    return () => {
      observer.disconnect();
      owner.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (motionPaused) return;
    const timer = window.setInterval(advance, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [motionPaused]);

  function goTo(index: number): void {
    setPaused(true);
    setCurrent(getCampsSlideIndex(index));
  }

  return (
    <section
      ref={heroRef}
      className={`${styles.hero} ${styles[campsSlideIds[current]]}`}
      data-locale={locale}
      data-slide={current}
      data-motion-disabled={reducedMotion}
      aria-label={text.carousel}
      aria-roledescription={text.carouselRole}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
      }}
    >
      <div className={styles.scribble} aria-hidden="true" />
      <div
        className={`landing-container ${styles.stage}`}
        onTouchStart={(event) => {
          const touch = event.touches[0];
          touchRef.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
        }}
        onTouchEnd={(event) => {
          const start = touchRef.current;
          const touch = event.changedTouches[0];
          touchRef.current = null;
          if (!start || !touch) return;
          const dx = touch.clientX - start.x;
          const dy = touch.clientY - start.y;
          if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(current + (dx < 0 ? 1 : -1));
        }}
        onTouchCancel={() => { touchRef.current = null; }}
      >
        <div
          className={styles.copy}
          role="group"
          aria-roledescription={text.slideRole}
          aria-label={`${text.slide} ${current + 1}: ${slide.title} ${slide.continuation ?? ""} ${slide.lastLine}`}
          aria-live={motionPaused ? "polite" : "off"}
          aria-atomic="true"
        >
          <div className={styles.eyebrows}>
            <span>{text.age}</span>
            <span>{text.duration}</span>
          </div>
          <h1 key={`${locale}-${current}`} className={styles.title}>
            <span className={styles.firstLine}>
              <span className={current === 2 ? styles.accent : undefined}>{slide.title}</span>
              {slide.continuation && <span className={styles.continuation}> {slide.continuation}</span>}
            </span>
            <span className={current !== 2 ? styles.accent : undefined}>{slide.lastLine}</span>
          </h1>
          <p className={styles.description}>
            {slide.description}
            {slide.desktopDescriptionTail && <span className={styles.desktopDescriptionTail}>{slide.desktopDescriptionTail}</span>}
          </p>
          {current !== 0 && <span className={styles.hashtag} aria-hidden="true" />}
          <div className={styles.actions}>
            <LeadButton kind="camps" className={`landing-button ${styles.primary}`}>{text.primary}</LeadButton>
            <a href="#camp-stories" className={`landing-button ${styles.secondary}`}>{text.secondary}</a>
          </div>
        </div>
        <div className={styles.controls} role="group" aria-label={text.carousel}>
          <div className={styles.dots}>
            {campsSlideIds.map((id, index) => (
              <button
                key={id}
                type="button"
                aria-label={`${text.slide} ${index + 1}: ${text.slides[index].title}`}
                aria-current={current === index ? "true" : undefined}
                onClick={() => goTo(index)}
              ><span /></button>
            ))}
          </div>
          <button
            type="button"
            className={styles.pause}
            aria-label={paused ? text.play : text.pause}
            aria-pressed={paused}
            title={paused ? text.play : text.pause}
            onClick={() => setPaused((value) => !value)}
          >
            <span className={paused ? styles.playGlyph : styles.pauseGlyph} aria-hidden="true" />
          </button>
          <button type="button" className={styles.previous} onClick={() => goTo(current - 1)} aria-label={text.previous}>
            <Image className={styles.desktopArrow} src="/landing/hero/chevron-left.svg" alt="" width={24} height={24} />
            <Image className={styles.mobileArrow} src={`${assetPath}mobile-chevron-left.svg`} alt="" width={15} height={15} />
          </button>
          <button type="button" className={styles.next} onClick={() => goTo(current + 1)} aria-label={text.next}>
            <Image className={styles.desktopArrow} src="/landing/hero/chevron-right.svg" alt="" width={24} height={24} />
            <Image className={styles.mobileArrow} src={`${assetPath}mobile-chevron-right.svg`} alt="" width={15} height={15} />
          </button>
        </div>
        <div key={current} className={styles.photographs} aria-hidden="true">
          {desktopPhotos[current].map((photo) => <FramedPhoto key={photo.nodeId} photo={photo} mobile={false} current={current} />)}
          {mobilePhotos[current].map((photo) => <FramedPhoto key={photo.nodeId} photo={photo} mobile current={current} />)}
        </div>
        <span className="sr-only">{slide.photoAlt}</span>
      </div>
    </section>
  );
}
