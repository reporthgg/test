import type { CSSProperties, ReactElement } from "react";
import type { Locale } from "@/i18n/config";
import styles from "./LandingHero.module.css";
import motionStyles from "./HeroMotion.module.css";

const textTracks = [
  [
    { nodeId: "418:26", delay: 0, duration: 235.294, stagger: 176.47059631347656 },
    { nodeId: "418:27", delay: 1055.4989576339722, duration: 258.065, stagger: 193.54833984375 },
  ],
  [
    { nodeId: "184:4007", delay: 0, duration: 186.047, stagger: 139.53485107421875 },
    { nodeId: "184:4008", delay: 1054.9999475479126, duration: 235.294, stagger: 176.47059631347656 },
  ],
  [
    { nodeId: "185:4129", delay: 0, duration: 131.148, stagger: 98.36063385009766 },
    { nodeId: "185:4130", delay: 1054.9999475479126, duration: 119.403, stagger: 89.55223846435547 },
  ],
] as const;

type HeroMotionTitleProps = {
  title: string;
  accent: string;
  current: number;
  locale: Locale;
};

export default function HeroMotionTitle({ title, accent, current, locale }: HeroMotionTitleProps): ReactElement {
  return (
    <h1 className={styles.title} aria-label={`${title} ${accent}`}>
      {[title, accent].map((line, lineIndex) => {
        const track = textTracks[current][lineIndex];
        // Translations keep the same 2s reveal and 75% character overlap.
        const duration = locale === "ru" ? track.duration : 2000 / (1 + 0.75 * (Array.from(line).length - 1));
        const stagger = locale === "ru" ? track.stagger : duration * 0.75;
        let characterIndex = 0;

        return (
          <span key={track.nodeId} className={lineIndex === 1 ? styles.accent : undefined} data-node-id={track.nodeId} aria-hidden="true">
            {line.split(/(\s+)/u).map((word, wordIndex) => {
              if (/^\s+$/u.test(word)) {
                characterIndex += Array.from(word).length;
                return word;
              }
              return (
                <span key={wordIndex} className={motionStyles.word}>
                  {Array.from(word).map((character) => {
                    const index = characterIndex++;
                    return (
                      <span
                        key={index}
                        className={motionStyles.character}
                        style={{
                          animationDuration: `${duration}ms`,
                          animationDelay: `${track.delay + index * stagger}ms`,
                        } satisfies CSSProperties}
                      >{character}</span>
                    );
                  })}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}
