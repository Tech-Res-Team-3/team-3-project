/*
  Warnings:

  - You are about to drop the column `vehicleId` on the `Address` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Address" DROP CONSTRAINT "Address_vehicleId_fkey";

-- AlterTable
ALTER TABLE "public"."Address" DROP COLUMN "vehicleId";

-- CreateTable
CREATE TABLE "public"."_VehicleAdresses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_VehicleAdresses_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_VehicleAdresses_B_index" ON "public"."_VehicleAdresses"("B");

-- AddForeignKey
ALTER TABLE "public"."_VehicleAdresses" ADD CONSTRAINT "_VehicleAdresses_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_VehicleAdresses" ADD CONSTRAINT "_VehicleAdresses_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
