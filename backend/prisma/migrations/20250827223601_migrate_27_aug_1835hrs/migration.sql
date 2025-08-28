-- DropForeignKey
ALTER TABLE "public"."DriverLicense" DROP CONSTRAINT "DriverLicense_userId_fkey";

-- AlterTable
ALTER TABLE "public"."DriverLicense" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."DriverLicense" ADD CONSTRAINT "DriverLicense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
