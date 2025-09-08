-- CreateTable
CREATE TABLE "public"."UserLogs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "UserLogs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserLogs_email_key" ON "public"."UserLogs"("email");
