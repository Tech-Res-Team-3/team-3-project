/*
  Warnings:

  - You are about to drop the column `addressId` on the `Vehicle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Vehicle" DROP COLUMN "addressId",
ALTER COLUMN "vehicleImage" DROP NOT NULL;
