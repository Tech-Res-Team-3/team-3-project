/*
  Warnings:

  - You are about to drop the column `state` on the `DriverLicense` table. All the data in the column will be lost.
  - Added the required column `issuingState` to the `DriverLicense` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."DriverLicense_state_idx";

-- AlterTable
ALTER TABLE "public"."DriverLicense" DROP COLUMN "state",
ADD COLUMN     "issuingState" VARCHAR(100) NOT NULL;

-- CreateIndex
CREATE INDEX "DriverLicense_issuingState_idx" ON "public"."DriverLicense"("issuingState");
