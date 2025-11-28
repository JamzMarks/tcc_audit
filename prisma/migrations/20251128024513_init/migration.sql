-- CreateEnum
CREATE TYPE "public"."Language" AS ENUM ('PTBR', 'EN', 'ES');

-- CreateEnum
CREATE TYPE "public"."Roles" AS ENUM ('USER', 'ADMIN', 'ENGINEER', 'AUDITOR');

-- CreateEnum
CREATE TYPE "public"."Theme" AS ENUM ('LIGHT', 'DARK');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "public"."Roles" NOT NULL DEFAULT 'USER',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "avatar" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserConfig" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "language" "public"."Language" NOT NULL DEFAULT 'EN',
    "theme" "public"."Theme" NOT NULL DEFAULT 'LIGHT',

    CONSTRAINT "UserConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MetricLog" (
    "id" SERIAL NOT NULL,
    "queue" TEXT NOT NULL,
    "routingKey" TEXT,
    "eventType" TEXT,
    "category" TEXT,
    "source" TEXT,
    "payload" JSONB NOT NULL,
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timestamp" TIMESTAMP(3),

    CONSTRAINT "MetricLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserConfig_userId_key" ON "public"."UserConfig"("userId");

-- CreateIndex
CREATE INDEX "MetricLog_queue_idx" ON "public"."MetricLog"("queue");

-- CreateIndex
CREATE INDEX "MetricLog_routingKey_idx" ON "public"."MetricLog"("routingKey");

-- CreateIndex
CREATE INDEX "MetricLog_eventType_idx" ON "public"."MetricLog"("eventType");

-- CreateIndex
CREATE INDEX "MetricLog_category_idx" ON "public"."MetricLog"("category");

-- CreateIndex
CREATE INDEX "MetricLog_source_idx" ON "public"."MetricLog"("source");

-- CreateIndex
CREATE INDEX "MetricLog_timestamp_idx" ON "public"."MetricLog"("timestamp");

-- AddForeignKey
ALTER TABLE "public"."UserConfig" ADD CONSTRAINT "UserConfig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
