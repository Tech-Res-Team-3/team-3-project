/*
  Warnings:

  - You are about to drop the column `verified` on the `DriverLicense` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Address" DROP CONSTRAINT "Address_userId_fkey";

-- DropIndex
DROP INDEX "public"."DriverLicense_verified_idx";

-- AlterTable
ALTER TABLE "public"."Address" ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."DriverLicense" DROP COLUMN "verified",
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "DriverLicense_isVerified_idx" ON "public"."DriverLicense"("isVerified");

-- AddForeignKey
ALTER TABLE "public"."Address" ADD CONSTRAINT "Address_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
