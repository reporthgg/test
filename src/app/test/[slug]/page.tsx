import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import LandingHeader from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingContacts";
import { LandingOverlays, LandingProvider } from "@/components/landing/LandingForms";
import TestRunner from "@/components/test/TestRunner";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { getServerLocale } from "@/lib/locale";
import { parseTestContactFields, toPublicTestQuestion } from "@/lib/test-content";
import { questionSummary, testPresentation } from "@/lib/test-presentation";
import { programsContent } from "@/components/landing/programs-content";
import JsonLd from "@/components/JsonLd";
import { buildPageMetadata, hiddenRobots } from "@/lib/seo";
import { testSeoCopy } from "@/lib/seo-content";
import { testJsonLd } from "@/lib/structured-data";
import flowStyles from "@/components/test/TestFlow.module.css";
import "@/components/landing/landing.css";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string | string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const query = await searchParams;
  const locale = await getServerLocale();
  const test = await prisma.test.findUnique({
    where: { slug },
    include: { questions: { select: { type: true } } },
  });
  if (!test || !test.published || test.questions.length === 0) {
    return { title: test?.title ?? programsContent[locale].allTests, robots: hiddenRobots, openGraph: null, twitter: null };
  }
  const copy = testSeoCopy[locale];
  const t = programsContent[locale];
  const minutes = new Intl.PluralRules(locale === "kz" ? "kk" : locale).select(test.timeLimit ?? 0);
  const duration = test.timeLimit
    ? `${test.timeLimit} ${t.minuteForms[minutes === "one" || minutes === "few" ? minutes : "other"]}`
    : t.noTimeLimit;
  const ownDescription = test.description?.replace(/\s+/gu, " ").trim();
  const description = locale === "ru" && ownDescription && ownDescription.length >= 100
    ? ownDescription
    : copy.description(test.title, questionSummary(test, locale), duration);
  return buildPageMetadata({
    locale,
    path: `/test/${encodeURIComponent(test.slug)}`,
    title: copy.title(test.title),
    description,
    index: query.preview === undefined,
  });
}

export default async function TestPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string | string[] }>;
}) {
  const { slug } = await params;
  const query = await searchParams;
  const previewRequested = query.preview === "1";
  const preview = previewRequested &&
    await verifySessionToken((await cookies()).get(SESSION_COOKIE)?.value);
  if (previewRequested && !preview) notFound();
  const test = await prisma.test.findUnique({
    where: { slug },
    include: {
      questions: {
        orderBy: { order: "asc" },
        include: { options: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!test || (!test.published && !preview) || test.questions.length === 0) notFound();

  const locale = await getServerLocale();
  const questions = test.questions.map(toPublicTestQuestion);
  const contactFields = parseTestContactFields(test.contactFields);
  const { flag } = testPresentation(test, locale);

  return (
    <div className={`landing ${flowStyles.shortPage}`} lang={locale === "kz" ? "kk" : locale}>
      {!preview && <JsonLd data={testJsonLd(locale, test)} />}
      <LandingProvider locale={locale} scope="tests">
        <LandingHeader locale={locale} />
        <main id="landing-main">
          <TestRunner
            slug={test.slug}
            title={test.title}
            description={test.description}
            timeLimit={test.timeLimit}
            questions={questions}
            contactFields={contactFields}
            preview={preview}
            scoringMode={test.scoringMode}
            flag={flag}
          />
        </main>
        <LandingFooter locale={locale} />
        <LandingOverlays />
      </LandingProvider>
    </div>
  );
}
