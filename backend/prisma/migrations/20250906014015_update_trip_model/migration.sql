/*
  Warnings:

  - You are about to drop the column `endLocation` on the `Trip` table. All the data in the column will be lost.
  - You are about to drop the column `startLocation` on the `Trip` table. All the data in the column will be lost.
  - Added the required column `endLat` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `endLng` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startLat` to the `Trip` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startLng` to the `Trip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Trip" DROP COLUMN "endLocation",
DROP COLUMN "startLocation",
ADD COLUMN     "endLat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "endLng" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "startLat" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "startLng" DOUBLE PRECISION NOT NULL;
