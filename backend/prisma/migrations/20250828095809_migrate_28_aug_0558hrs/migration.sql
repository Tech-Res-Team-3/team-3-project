/*
  Warnings:

  - Changed the type of `expirationDate` on the `DriverLicense` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."DriverLicense" DROP COLUMN "expirationDate",
ADD COLUMN     "expirationDate" VARCHAR(15) NOT NULL;
