import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { LeadButton } from "@/components/landing/LandingForms";
import { withLocale } from "@/i18n/config";
import type { Locale } from "@/i18n/config";
import { prisma } from "@/lib/prisma";
import ProgramsCarousel from "./ProgramsCarousel";
import { programsContent } from "./programs-content";
import { studentStories } from "./stories-content";
import styles from "./LandingPrograms.module.css";

const directions = [
  { path: "/school", icon: "message", tone: "light", width: 28, height: 26 },
  { path: "/exams", icon: "document", tone: "green", width: 24, height: 30 },
  { path: "/abroad", icon: "rocket", tone: "yellow", width: 40, height: 40 },
  { path: "/camps", icon: "lightning", tone: "light", width: 23, height: 33 },
] as const;

type PublishedTest = {
  id: string;
  slug: string;
  title: string;
  kind: string;
  audience: string;
  timeLimit: number | null;
  questions: { type: string }[];
};

function testPresentation(test: PublishedTest, locale: Locale) {
  const t = programsContent[locale];
  if (test.kind === "ielts") return { title: "IELTS", flag: "ielts", age: "" };
  if (test.kind === "sat") return { title: "SAT", flag: "sat", age: "" };
  if (test.slug === "tilda-kids-6-8") {
    return { title: t.testTitles.kids, flag: "kids-young", age: `(6-8 ${t.years})` };
  }
  if (test.slug === "tilda-kids-9-12") {
    return { title: t.testTitles.kids, flag: "kids-older", age: `(9-12 ${t.years})` };
  }
  if (test.slug === "general-english" || test.slug === "tilda-general-english") {
    return { title: t.testTitles.general, flag: "general", age: "" };
  }
  if (test.slug === "kids-english") {
    return { title: t.testTitles.kids, flag: "kids-young", age: "" };
  }
  return {
    title: test.title,
    flag: test.audience === "kids" ? "kids-young" : "general",
    age: "",
  };
}

function questionSummary(test: PublishedTest, locale: Locale): string {
  const written = test.questions.filter((question) => question.type === "essay").length;
  const questions = test.questions.length - written;
  const t = programsContent[locale];
  const rules = new Intl.PluralRules(locale === "kz" ? "kk" : locale);
  const questionCategory = rules.select(questions);
  const writtenCategory = rules.select(written);
  const questionForm = questionCategory === "one" || questionCategory === "few" ? questionCategory : "other";
  const writtenForm = writtenCategory === "one" || writtenCategory === "few" ? writtenCategory : "other";
  return `${questions} ${t.questionForms[questionForm]}${written > 0 ? ` + ${written} ${t.writtenForms[writtenForm]}` : ""}`;
}

export default async function LandingPrograms({
  locale,
}: {
  locale: Locale;
}): Promise<ReactNode> {
  const t = programsContent[locale];
  const studentStory = studentStories.find((story) => story.id === "aminka");
  const tests = await prisma.test.findMany({
    where: { published: true, questions: { some: {} } },
    orderBy: { order: "asc" },
    select: {
      id: true,
      slug: true,
      title: true,
      kind: true,
      audience: true,
      timeLimit: true,
      questions: { select: { type: true } },
    },
  });

  return (
    <div className={styles.programs} lang={locale === "kz" ? "kk" : locale}>
      <section id="directions" className={styles.directions} aria-labelledby="directions-title">
        <div className={`landing-container ${styles.directionsInner}`}>
          <div className={styles.directionsHeader}>
            <h2 id="directions-title" className={`landing-title ${styles.directionsTitle}`}>
              {t.directionsTitle[0]} <em>{t.directionsTitle[1]}</em>
              <span>{t.directionsTitle[2]}</span>
            </h2>
            <p className={styles.directionsIntro}>{t.directionsIntro}</p>
          </div>
          <div className={styles.directionsGrid}>
            {directions.map((direction, index) => {
              const copy = t.directions[index];
              return (
                <article
                  key={direction.path}
                  className={`${styles.directionCard} ${styles[direction.tone]}`}
                >
                  <h3>{copy.title}</h3>
                  <p>
                    {copy.description.split(/(IELTS|SAT)/u).map((part, partIndex) =>
                      part === "IELTS" || part === "SAT"
                        ? <strong key={partIndex}>{part}</strong>
                        : part,
                    )}
                  </p>
                  <span className={styles.directionIcon} aria-hidden="true">
                    <picture>
                      <source
                        media="(max-width: 767px)"
                        srcSet={`/landing/programs/${direction.icon}-mobile.svg`}
                      />
                      <Image
                        src={`/landing/programs/${direction.icon}.svg`}
                        alt=""
                        width={direction.width}
                        height={direction.height}
                        className={styles.serviceIconImage}
                      />
                    </picture>
                  </span>
                  {index === 0 && (
                    <ul className={styles.languageFormats}>
                      {t.languageFormats.map((format) => <li key={format}>{format}</li>)}
                    </ul>
                  )}
                  <Link href={withLocale(locale, direction.path)} className={styles.directionLink}>
                    {copy.cta}
                    <picture>
                      <source
                        media="(max-width: 767px)"
                        srcSet={`/landing/programs/wave-arrow-${direction.tone === "light" ? "blue" : "white"}-mobile.svg`}
                      />
                      <Image
                        src={`/landing/programs/wave-arrow-${direction.tone === "light" ? "blue" : "white"}.svg`}
                        alt=""
                        width={55}
                        height={15}
                      />
                    </picture>
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
        <div className={styles.ticketSticker} aria-hidden="true">
          <Image className={styles.ticketDesktop} src="/landing/programs/ticket-sticker.png" alt="" width={380} height={253} sizes="380px" />
          <Image className={styles.ticketMobile} src="/landing/programs/ticket-sticker-mobile.png" alt="" width={194} height={130} sizes="194px" />
        </div>
        <Image
          className={styles.pinkSticker}
          src="/landing/programs/pink-sticker.png"
          alt=""
          width={220}
          height={220}
          sizes="(max-width: 767px) 100px, 220px"
        />
      </section>

      <section id="tests" className={styles.tests} aria-labelledby="tests-title">
        <div className={`landing-container ${styles.testsHeader}`}>
          <h2 id="tests-title" className={`landing-title ${styles.testsTitle}`}>
            {t.testsTitle[0]} <em>{t.testsTitle[1]}</em>
          </h2>
          <p>{t.testsIntro}</p>
        </div>
        {tests.length > 0 ? (
          <ProgramsCarousel
            label={`${t.testsTitle[0]} ${t.testsTitle[1]}`}
            previousLabel={t.previous}
            nextLabel={t.next}
          >
            {tests.map((test) => {
              const card = testPresentation(test, locale);
              return (
                <article
                  key={test.id}
                  className={`${styles.testCard} ${card.flag === "general" ? styles.generalTest : ""}`}
                >
                  <picture className={`${styles.testFlag} ${card.flag.startsWith("kids") ? styles.kidsFlag : ""}`}>
                    <source media="(max-width: 767px)" srcSet={`/landing/programs/flag-${card.flag}-mobile.svg`} />
                    <Image src={`/landing/programs/flag-${card.flag}.svg`} alt="" width={card.flag === "general" || card.flag === "ielts" ? 45 : 60} height={card.flag === "general" ? 72 : 53} />
                  </picture>
                  <h3>{card.title}</h3>
                  {card.age && <p className={styles.testAge}>{card.age}</p>}
                  <div className={styles.testMeta}>
                    <span className={styles.questionCount}>{questionSummary(test, locale)}</span>
                    <span>
                      <picture>
                        <source media="(max-width: 767px)" srcSet="/landing/programs/timer-mobile.svg" />
                        <Image src="/landing/programs/timer.svg" alt="" width={17} height={19} />
                      </picture>
                      {test.timeLimit ? `${test.timeLimit} ${t.minutes}` : t.noTimeLimit}
                    </span>
                  </div>
                  <Link href={withLocale(locale, `/test/${test.slug}`)} className={styles.testLink}>
                    {t.startTest}
                    <Image src="/landing/programs/arrow-white.svg" alt="" width={27} height={8} />
                  </Link>
                </article>
              );
            })}
          </ProgramsCarousel>
        ) : (
          <div className={`landing-container ${styles.emptyTests}`}>
            <p>{t.testsEmpty}</p>
            <LeadButton kind="diagnostic" className={`landing-button ${styles.yellowButton}`}>
              {t.consultationCta}
            </LeadButton>
          </div>
        )}
      </section>

      <section className={styles.abroad} aria-labelledby="admission-title">
        <div className={`landing-container ${styles.abroadInner}`}>
          <div className={styles.abroadCopy}>
            <h2 id="admission-title" className={`landing-title ${styles.abroadTitle}`}>
              {t.abroadTitle[0]} <em>{t.abroadTitle[1]}</em>
            </h2>
            <p className={styles.abroadDescription}>
              <span className={styles.desktopDescription}>
                <strong>{t.abroadLead}</strong>{t.abroadDetails}{" "}
              </span>
              {t.abroadSummary}
            </p>
            <ul className={styles.consultationTags}>
              {t.consultationTags.map((tag) => <li key={tag}>{tag}</li>)}
            </ul>
            <LeadButton kind="diagnostic" className={styles.consultationButton}>
              <span>{t.consultationCta}</span>
              <Image src="/landing/programs/consultation-arrow.svg" alt="" width={155} height={65} />
            </LeadButton>
          </div>
          <figure className={styles.student}>
            <div className={styles.studentPortrait}>
              <Image
                src="/landing/programs/aminka.png"
                alt={t.studentImageAlt}
                width={350}
                height={554}
                className={styles.studentPhoto}
                sizes="(max-width: 767px) calc(100vw - 32px), 350px"
              />
              <div className={styles.portraitFrame} aria-hidden="true">
                {Array.from({ length: 10 }, (_, index) => <span key={index} />)}
              </div>
              {studentStory && (
                <a
                  href={studentStory.href}
                  className={styles.studentPlay}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.watchStudentVideo}
                >
                  <picture>
                    <source media="(max-width: 767px)" srcSet="/landing/programs/play-mobile.svg" />
                    <Image src="/landing/programs/play.svg" alt="" width={62} height={62} />
                  </picture>
                </a>
              )}
            </div>
            <figcaption className={styles.studentCaption}>
              <span>{t.studentName}</span>
              <span>{t.studentFollowers}</span>
            </figcaption>
            <span className={styles.mapSticker} aria-hidden="true">
              <Image src="/landing/programs/map-sticker.png" alt="" width={144} height={146} sizes="144px" />
            </span>
            <span className={styles.gscSticker} aria-hidden="true">
              <Image src="/landing/programs/gsc-sticker.png" alt="" width={216} height={143} sizes="216px" />
            </span>
          </figure>
        </div>
      </section>

      <section id="steps" className={styles.steps} aria-label={t.stepsLabel}>
        <picture className={styles.divider}>
          <source media="(max-width: 767px)" srcSet="/landing/programs/divider-mobile.svg" />
          <Image src="/landing/programs/divider.svg" alt="" width={1530} height={36} />
        </picture>
        <div className={`landing-container ${styles.stepsInner}`}>
          <div className={styles.studentPhotos}>
            <picture className={styles.studentsLeft}>
              <source media="(max-width: 767px)" srcSet="/landing/programs/students-left-mobile.png" />
              <Image src="/landing/programs/students-left.png" alt={t.studentsImageAlt} width={324} height={459} unoptimized />
            </picture>
            <picture className={styles.studentsScribble}>
              <source media="(max-width: 767px)" srcSet="/landing/programs/students-scribble-mobile.svg" />
              <Image src="/landing/programs/students-scribble.svg" alt="" width={643} height={382} />
            </picture>
            <picture className={styles.studentsRight}>
              <source media="(max-width: 767px)" srcSet="/landing/programs/students-right-mobile.png" />
              <Image src="/landing/programs/students-right.png" alt={t.studentsImageAlt} width={448} height={602} unoptimized />
            </picture>
          </div>
          <ol className={styles.stepsList}>
            {t.steps.map((step, index) => (
              <li key={step.title}>
                <span className={styles.stepNumber} aria-hidden="true">{index + 1}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <LeadButton kind="diagnostic" className={`landing-button ${styles.mobileAdmissionButton}`}>
            {t.discussAdmission}
          </LeadButton>
        </div>
      </section>
    </div>
  );
}
