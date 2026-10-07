import type { CSSProperties, ReactElement } from "react";
import Image, { type StaticImageData } from "next/image";
import university from "../../../public/landing/hero/university.png";
import students from "../../../public/landing/hero/students.png";
import mobileUniversity from "../../../public/landing/hero/mobile-university.png";
import mobileStudents from "../../../public/landing/hero/mobile-students.png";
import englishPortrait from "../../../public/landing/hero/english-portrait.png";
import englishStudents from "../../../public/landing/hero/english-students.png";
import abroadUniversity from "../../../public/landing/hero/abroad-university.png";
import abroadStudents from "../../../public/landing/hero/abroad-students.png";
import mobileEnglishPortrait from "../../../public/landing/hero/mobile-english-portrait.png";
import mobileEnglishStudents from "../../../public/landing/hero/mobile-english-students.png";
import mobileAbroadUniversity from "../../../public/landing/hero/mobile-abroad-university.png";
import mobileAbroadStudents from "../../../public/landing/hero/mobile-abroad-students.png";
import styles from "./LandingHero.module.css";
import motionStyles from "./HeroMotion.module.css";

type Photo = {
  image: StaticImageData;
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
  renderX: number;
  renderY: number;
  shadow?: boolean;
};

const desktopPhotos: readonly (readonly Photo[])[] = [
  [
    { image: university, x: 100, y: 730.312, width: 474, height: 314, angle: -5, renderX: 100, renderY: 689 },
    { image: students, x: 388.756, y: 497, width: 350, height: 525, angle: 5, renderX: 343, renderY: 497, shadow: true },
  ],
  [
    { image: englishPortrait, x: 100, y: 638.504, width: 350, height: 525, angle: -5, renderX: 100, renderY: 608 },
    { image: englishStudents, x: 388.757, y: 532, width: 350, height: 525, angle: 5, renderX: 340.494, renderY: 532, shadow: true },
  ],
  [
    { image: abroadUniversity, x: 100, y: 730.312, width: 474, height: 314, angle: -5, renderX: 100, renderY: 689 },
    { image: abroadStudents, x: 388.756, y: 633, width: 350, height: 525, angle: 5, renderX: 343, renderY: 633, shadow: true },
  ],
];

const mobilePhotos: readonly (readonly Photo[])[] = [
  [
    { image: mobileUniversity, x: -20, y: 191.027, width: 356, height: 240, angle: -5, renderX: 0, renderY: 160 },
    { image: mobileStudents, x: 164.861, y: 0, width: 266, height: 400, angle: 5, renderX: 102.112, renderY: -5.289, shadow: true },
  ],
  [
    { image: mobileEnglishPortrait, x: -27.486, y: 82.898, width: 266, height: 400, angle: -5, renderX: 0, renderY: 59.715 },
    { image: mobileEnglishStudents, x: 164.861, y: 0, width: 266, height: 400, angle: 5, renderX: 102.111, renderY: -5.288, shadow: true },
  ],
  [
    { image: mobileAbroadUniversity, x: -50, y: 74.027, width: 356, height: 240, angle: -5, renderX: 0, renderY: 43 },
    { image: mobileAbroadStudents, x: 164.861, y: 0, width: 266, height: 400, angle: 5, renderX: 102.111, renderY: -5.288, shadow: true },
  ],
];

const motionNodeIds = [
  ["418:87", "418:111"],
  ["264:220", "184:4036"],
  ["264:278", "264:302"],
] as const;

function FramedPhoto({ photo, mobile, current, index }: { photo: Photo; mobile: boolean; current: number; index: number }): ReactElement {
  const angle = photo.angle * Math.PI / 180;
  const dx = photo.renderX - photo.x;
  const dy = photo.renderY - photo.y;
  const frameStyle: CSSProperties = {
    width: photo.width,
    height: photo.height,
    left: mobile ? `calc((100% - 358px) / 2 + ${photo.x - 16}px)` : photo.x - 100,
    top: photo.y,
    transform: `rotate(${photo.angle}deg)`,
    boxShadow: photo.shadow
      ? mobile
        ? "11.3px 33.9px 41.43px rgb(0 0 0 / 20%)"
        : "43.43px 52.62px 45.94px rgb(0 0 0 / 12%)"
      : undefined,
  };
  return (
    <div
      className={`${motionStyles.photograph} ${mobile ? styles.mobilePhoto : styles.desktopPhoto}`}
      data-slide={current}
      data-photo={index}
      data-motion-wrapper-for={motionNodeIds[current][index]}
      style={{
        left: frameStyle.left,
        top: frameStyle.top,
        width: photo.width,
        height: photo.height,
        // Scale around the rotated frame's center without changing its clipping coordinates.
        transformOrigin: `${(photo.width * Math.cos(angle) - photo.height * Math.sin(angle)) / 2}px ${(photo.width * Math.sin(angle) + photo.height * Math.cos(angle)) / 2}px`,
      }}
    >
      <div className={`${styles.photoFrame} ${mobile ? styles.mobilePhoto : styles.desktopPhoto}`} style={{ ...frameStyle, left: 0, top: 0 }}>
        <Image
          src={photo.image}
          alt=""
          sizes={`${photo.image.width}px`}
          className={styles.photoImage}
          style={{
            left: dx * Math.cos(angle) + dy * Math.sin(angle),
            top: -dx * Math.sin(angle) + dy * Math.cos(angle),
            width: photo.image.width,
            height: photo.image.height,
            transform: `rotate(${-photo.angle}deg)`,
          }}
        />
      </div>
    </div>
  );
}

export default function HeroPhotographs({ current }: { current: number }): ReactElement {
  return (
    <div className={styles.photographs} aria-hidden="true">
      {desktopPhotos[current].map((photo, index) => <FramedPhoto key={photo.image.src} photo={photo} mobile={false} current={current} index={index} />)}
      {mobilePhotos[current].map((photo, index) => <FramedPhoto key={photo.image.src} photo={photo} mobile current={current} index={index} />)}
    </div>
  );
}
