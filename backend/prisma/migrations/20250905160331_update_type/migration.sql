/*
  Warnings:

  - You are about to drop the `_VehicleAdresses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."_VehicleAdresses" DROP CONSTRAINT "_VehicleAdresses_A_fkey";

-- DropForeignKey
ALTER TABLE "public"."_VehicleAdresses" DROP CONSTRAINT "_VehicleAdresses_B_fkey";

-- DropTable
DROP TABLE "public"."_VehicleAdresses";

-- CreateTable
CREATE TABLE "public"."_VehicleAddresses" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_VehicleAddresses_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_VehicleAddresses_B_index" ON "public"."_VehicleAddresses"("B");

-- AddForeignKey
ALTER TABLE "public"."_VehicleAddresses" ADD CONSTRAINT "_VehicleAddresses_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Address"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_VehicleAddresses" ADD CONSTRAINT "_VehicleAddresses_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."Vehicle"("id") ON DELETE CASCADE ON UPDATE CASCADE;
