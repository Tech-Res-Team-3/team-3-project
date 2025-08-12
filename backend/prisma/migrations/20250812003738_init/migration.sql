-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('GUEST', 'HOST', 'ADMIN');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(150) NOT NULL,
    "lastName" VARCHAR(150) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "hash" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(14),
    "photoUrl" VARCHAR(2048),
    "role" "public"."Role" NOT NULL DEFAULT 'GUEST',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "verifiedDriver" BOOLEAN NOT NULL DEFAULT false,
    "rating" INTEGER DEFAULT 0,
    "tripsCompleted" INTEGER DEFAULT 0,
    "stripeAccountId" VARCHAR(100),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DriverLicense" (
    "id" SERIAL NOT NULL,
    "number" VARCHAR(100) NOT NULL,
    "state" VARCHAR(100) NOT NULL,
    "expiration" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "DriverLicense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "DriverLicense_number_key" ON "public"."DriverLicense"("number");

-- CreateIndex
CREATE UNIQUE INDEX "DriverLicense_userId_key" ON "public"."DriverLicense"("userId");

-- AddForeignKey
ALTER TABLE "public"."DriverLicense" ADD CONSTRAINT "DriverLicense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
