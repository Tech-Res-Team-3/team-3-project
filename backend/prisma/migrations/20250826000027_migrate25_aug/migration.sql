/*
  Warnings:

  - Added the required column `vehicleId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressId` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bodyStyle` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `extraInfo` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hasSalvageTitle` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mileage` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `salesTaxPaid` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trim` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `Vehicle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vin` to the `Vehicle` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."SeatbeltType" AS ENUM ('SHOULDER', 'LAP', 'BOTH');

-- CreateEnum
CREATE TYPE "public"."Condition" AS ENUM ('EXCELLENT', 'GOOD', 'FAIR', 'NOT_WORKING');

-- CreateEnum
CREATE TYPE "public"."Transmission" AS ENUM ('AUTOMATIC', 'MANUAL');

-- AlterTable
ALTER TABLE "public"."Address" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "vehicleId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "public"."Vehicle" ADD COLUMN     "addressId" INTEGER NOT NULL,
ADD COLUMN     "bodyStyle" TEXT NOT NULL,
ADD COLUMN     "condition" "public"."Condition" NOT NULL DEFAULT 'GOOD',
ADD COLUMN     "extraInfo" TEXT NOT NULL,
ADD COLUMN     "hasSalvageTitle" BOOLEAN NOT NULL,
ADD COLUMN     "hasSeatbelts" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "mileage" INTEGER NOT NULL,
ADD COLUMN     "salesTaxPaid" BOOLEAN NOT NULL,
ADD COLUMN     "seatbeltType" "public"."SeatbeltType" NOT NULL DEFAULT 'BOTH',
ADD COLUMN     "transmission" "public"."Transmission" NOT NULL DEFAULT 'AUTOMATIC',
ADD COLUMN     "trim" TEXT NOT NULL,
ADD COLUMN     "value" INTEGER NOT NULL,
ADD COLUMN     "vin" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Address" ADD CONSTRAINT "Address_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "public"."Vehicle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
