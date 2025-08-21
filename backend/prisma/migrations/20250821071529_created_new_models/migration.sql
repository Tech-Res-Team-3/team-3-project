/*
  Warnings:

  - You are about to drop the column `number` on the `DriverLicense` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Language` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[placeId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[licenseNumber]` on the table `DriverLicense` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `licenseNumber` to the `DriverLicense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `DriverLicense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Language` table without a default value. This is not possible if the table is not empty.
  - Made the column `rating` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tripsCompleted` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('SCHEDULED', 'ACTIVE', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "public"."BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'DECLINED');

-- DropIndex
DROP INDEX "public"."Address_userId_key";

-- DropIndex
DROP INDEX "public"."DriverLicense_number_key";

-- DropIndex
DROP INDEX "public"."DriverLicense_userId_key";

-- DropIndex
DROP INDEX "public"."Language_code_key";

-- AlterTable
ALTER TABLE "public"."Address" ADD COLUMN     "latitude" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "longitude" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "placeId" VARCHAR(100);

-- AlterTable
ALTER TABLE "public"."DriverLicense" DROP COLUMN "number",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "licenseNumber" VARCHAR(100) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "expiration" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "public"."Language" DROP COLUMN "code",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "lastName" DROP NOT NULL,
ALTER COLUMN "email" SET DATA TYPE VARCHAR(320),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(15),
ALTER COLUMN "rating" SET NOT NULL,
ALTER COLUMN "tripsCompleted" SET NOT NULL;

-- CreateTable
CREATE TABLE "public"."Vehicle" (
    "id" SERIAL NOT NULL,
    "make" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "licensePlate" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "seats" INTEGER NOT NULL DEFAULT 5,
    "type" TEXT NOT NULL,
    "vehicleImage" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Trip" (
    "id" SERIAL NOT NULL,
    "startLocation" TEXT NOT NULL,
    "endLocation" TEXT NOT NULL,
    "startAt" TIMESTAMP(3) NOT NULL,
    "endAt" TIMESTAMP(3) NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'SCHEDULED',
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "userId" INTEGER NOT NULL,
    "vehicleId" INTEGER NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Booking" (
    "id" SERIAL NOT NULL,
    "bookedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stripeId" TEXT,
    "status" "public"."BookingStatus" NOT NULL DEFAULT 'PENDING',
    "userId" INTEGER NOT NULL,
    "tripId" INTEGER NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Invoice" (
    "id" SERIAL NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "extrasTotal" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "tax" DOUBLE PRECISION NOT NULL,
    "feesTotal" DOUBLE PRECISION NOT NULL,
    "milageFee" DOUBLE PRECISION NOT NULL,
    "lateFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,
    "tripId" INTEGER NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Vehicle_userId_idx" ON "public"."Vehicle"("userId");

-- CreateIndex
CREATE INDEX "Vehicle_make_model_idx" ON "public"."Vehicle"("make", "model");

-- CreateIndex
CREATE INDEX "Vehicle_licensePlate_idx" ON "public"."Vehicle"("licensePlate");

-- CreateIndex
CREATE INDEX "Trip_userId_idx" ON "public"."Trip"("userId");

-- CreateIndex
CREATE INDEX "Trip_vehicleId_idx" ON "public"."Trip"("vehicleId");

-- CreateIndex
CREATE INDEX "Trip_status_idx" ON "public"."Trip"("status");

-- CreateIndex
CREATE INDEX "Trip_startAt_endAt_idx" ON "public"."Trip"("startAt", "endAt");

-- CreateIndex
CREATE INDEX "Booking_userId_idx" ON "public"."Booking"("userId");

-- CreateIndex
CREATE INDEX "Booking_tripId_idx" ON "public"."Booking"("tripId");

-- CreateIndex
CREATE INDEX "Booking_status_idx" ON "public"."Booking"("status");

-- CreateIndex
CREATE INDEX "Booking_bookedAt_idx" ON "public"."Booking"("bookedAt");

-- CreateIndex
CREATE INDEX "Invoice_userId_idx" ON "public"."Invoice"("userId");

-- CreateIndex
CREATE INDEX "Invoice_tripId_idx" ON "public"."Invoice"("tripId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_placeId_key" ON "public"."Address"("placeId");

-- CreateIndex
CREATE INDEX "Address_userId_idx" ON "public"."Address"("userId");

-- CreateIndex
CREATE INDEX "Address_city_state_idx" ON "public"."Address"("city", "state");

-- CreateIndex
CREATE INDEX "Address_latitude_longitude_idx" ON "public"."Address"("latitude", "longitude");

-- CreateIndex
CREATE UNIQUE INDEX "DriverLicense_licenseNumber_key" ON "public"."DriverLicense"("licenseNumber");

-- CreateIndex
CREATE INDEX "DriverLicense_userId_idx" ON "public"."DriverLicense"("userId");

-- CreateIndex
CREATE INDEX "DriverLicense_state_idx" ON "public"."DriverLicense"("state");

-- CreateIndex
CREATE INDEX "DriverLicense_verified_idx" ON "public"."DriverLicense"("verified");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "public"."User"("role");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "public"."User"("createdAt");

-- AddForeignKey
ALTER TABLE "public"."Language" ADD CONSTRAINT "Language_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Vehicle" ADD CONSTRAINT "Vehicle_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Trip" ADD CONSTRAINT "Trip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Trip" ADD CONSTRAINT "Trip_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Invoice" ADD CONSTRAINT "Invoice_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
