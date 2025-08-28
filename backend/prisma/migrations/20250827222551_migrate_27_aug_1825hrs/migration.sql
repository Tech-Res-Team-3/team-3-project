/*
  Warnings:

  - You are about to drop the column `expiration` on the `DriverLicense` table. All the data in the column will be lost.
  - Added the required column `expirationDate` to the `DriverLicense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."DriverLicense" DROP COLUMN "expiration",
ADD COLUMN     "expirationDate" DATE NOT NULL;
