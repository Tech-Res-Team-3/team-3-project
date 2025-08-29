/*
  Warnings:

  - The values [DECLINED] on the enum `BookingStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."BookingStatus_new" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELED');
ALTER TABLE "public"."Booking" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."Booking" ALTER COLUMN "status" TYPE "public"."BookingStatus_new" USING ("status"::text::"public"."BookingStatus_new");
ALTER TYPE "public"."BookingStatus" RENAME TO "BookingStatus_old";
ALTER TYPE "public"."BookingStatus_new" RENAME TO "BookingStatus";
DROP TYPE "public"."BookingStatus_old";
ALTER TABLE "public"."Booking" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Booking" DROP CONSTRAINT "Booking_tripId_fkey";

-- AlterTable
ALTER TABLE "public"."Booking" ALTER COLUMN "tripId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Booking" ADD CONSTRAINT "Booking_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "public"."Trip"("id") ON DELETE SET NULL ON UPDATE CASCADE;
