-- CreateEnum
CREATE TYPE "draft_form_type" AS ENUM ('PROFILE', 'PARTNER_PREFERENCE');

-- CreateTable
CREATE TABLE "drafts" (
    "id" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "formType" "draft_form_type" NOT NULL,
    "data" JSONB NOT NULL,
    "step" INTEGER DEFAULT 1,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "drafts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "drafts_userId_formType_key" ON "drafts"("userId", "formType");

-- AddForeignKey
ALTER TABLE "drafts" ADD CONSTRAINT "drafts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
