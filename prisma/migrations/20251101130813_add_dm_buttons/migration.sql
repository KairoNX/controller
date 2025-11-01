-- AlterTable
ALTER TABLE "Listener" ADD COLUMN     "buttons" JSONB;

-- CreateTable
CREATE TABLE "EngagementSnapshot" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalResponses" INTEGER NOT NULL DEFAULT 0,
    "totalDMs" INTEGER NOT NULL DEFAULT 0,
    "totalComments" INTEGER NOT NULL DEFAULT 0,
    "totalConversations" INTEGER NOT NULL DEFAULT 0,
    "responseRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "activeAutomations" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EngagementSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "EngagementSnapshot_userId_date_idx" ON "EngagementSnapshot"("userId", "date");

-- CreateIndex
CREATE UNIQUE INDEX "EngagementSnapshot_userId_date_key" ON "EngagementSnapshot"("userId", "date");

-- AddForeignKey
ALTER TABLE "EngagementSnapshot" ADD CONSTRAINT "EngagementSnapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
