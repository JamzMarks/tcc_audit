/*
  Warnings:

  - You are about to drop the column `name` on the `UserLogs` table. All the data in the column will be lost.
  - Added the required column `operation` to the `UserLogs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserLogs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."UserOperation" AS ENUM ('LOGIN', 'LOGOUT', 'CREATED', 'UPDATED', 'DELETED');

-- CreateEnum
CREATE TYPE "public"."LogLevel" AS ENUM ('INFO', 'WARN', 'ERROR');

-- CreateEnum
CREATE TYPE "public"."SecurityOperation" AS ENUM ('MFA_ENABLED', 'MFA_DISABLED', 'ROLE_CHANGED', 'ACCOUNT_LOCKED', 'ACCOUNT_UNLOCKED', 'LOGIN_ATTEMPT', 'PASSWORD_CHANGED');

-- CreateEnum
CREATE TYPE "public"."FileOperation" AS ENUM ('INSERT', 'DELETED', 'UPDATED');

-- DropIndex
DROP INDEX "public"."UserLogs_email_key";

-- AlterTable
ALTER TABLE "public"."UserLogs" DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "ipAddress" TEXT,
ADD COLUMN     "level" "public"."LogLevel" NOT NULL DEFAULT 'INFO',
ADD COLUMN     "operation" "public"."UserOperation" NOT NULL,
ADD COLUMN     "userAgent" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."UserSecurityLogs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "operation" "public"."SecurityOperation" NOT NULL,
    "level" "public"."LogLevel" NOT NULL DEFAULT 'INFO',
    "description" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserSecurityLogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FilesLogs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "operation" "public"."FileOperation" NOT NULL,
    "fileName" TEXT,
    "fileSize" INTEGER,
    "fileType" TEXT,
    "folderId" TEXT,
    "level" "public"."LogLevel" NOT NULL DEFAULT 'INFO',
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FilesLogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UserSecurityLogs_userId_idx" ON "public"."UserSecurityLogs"("userId");

-- CreateIndex
CREATE INDEX "UserSecurityLogs_operation_idx" ON "public"."UserSecurityLogs"("operation");

-- CreateIndex
CREATE INDEX "UserSecurityLogs_createdAt_idx" ON "public"."UserSecurityLogs"("createdAt");

-- CreateIndex
CREATE INDEX "FilesLogs_userId_idx" ON "public"."FilesLogs"("userId");

-- CreateIndex
CREATE INDEX "FilesLogs_operation_idx" ON "public"."FilesLogs"("operation");

-- CreateIndex
CREATE INDEX "FilesLogs_createdAt_idx" ON "public"."FilesLogs"("createdAt");

-- CreateIndex
CREATE INDEX "UserLogs_userId_idx" ON "public"."UserLogs"("userId");

-- CreateIndex
CREATE INDEX "UserLogs_operation_idx" ON "public"."UserLogs"("operation");

-- CreateIndex
CREATE INDEX "UserLogs_createdAt_idx" ON "public"."UserLogs"("createdAt");
