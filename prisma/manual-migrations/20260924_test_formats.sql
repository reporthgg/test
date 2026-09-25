BEGIN IMMEDIATE;

ALTER TABLE "Test" ADD COLUMN "scoringMode" TEXT NOT NULL DEFAULT 'level';
ALTER TABLE "Test" ADD COLUMN "sourceKey" TEXT;
ALTER TABLE "Test" ADD COLUMN "sourceHash" TEXT;
ALTER TABLE "Test" ADD COLUMN "contactFields" TEXT;
CREATE UNIQUE INDEX "Test_sourceKey_key" ON "Test"("sourceKey");

ALTER TABLE "Question" ADD COLUMN "type" TEXT NOT NULL DEFAULT 'choice';
ALTER TABLE "Question" ADD COLUMN "contentHtml" TEXT;
ALTER TABLE "Question" ADD COLUMN "acceptedAnswers" TEXT;
ALTER TABLE "Question" ADD COLUMN "required" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "Question" ADD COLUMN "sourceKey" TEXT;

ALTER TABLE "Option" ADD COLUMN "contentHtml" TEXT;

ALTER TABLE "TestResult" ADD COLUMN "pendingReview" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "TestResult" ADD COLUMN "submissionSnapshot" TEXT;

COMMIT;
