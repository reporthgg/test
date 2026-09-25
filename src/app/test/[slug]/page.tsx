import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TestRunner from "@/components/test/TestRunner";
import Aurora from "@/components/ui/Aurora";
import { prisma } from "@/lib/prisma";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";
import { parseTestContactFields, toPublicTestQuestion } from "@/lib/test-content";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const test = await prisma.test.findUnique({ where: { slug } });
  return {
    title: test?.published ? `${test.title}: тест уровня | GSC Study` : "Тест",
    ...(!test?.published ? { robots: { index: false, follow: false } } : {}),
  };
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

  const questions = test.questions.map(toPublicTestQuestion);
  const contactFields = parseTestContactFields(test.contactFields);

  return (
    <>
      <Header />
      <main className="pt-20 min-h-screen bg-background bg-dots relative overflow-hidden">
        <Aurora intensity="subtle" />
        <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
          <TestRunner
            slug={test.slug}
            title={test.title}
            description={test.description}
            timeLimit={test.timeLimit}
            questions={questions}
            contactFields={contactFields}
            preview={preview}
            scoringMode={test.scoringMode}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
