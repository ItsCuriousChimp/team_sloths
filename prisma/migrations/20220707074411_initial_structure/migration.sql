/*
  Warnings:

  - You are about to drop the column `screenNumber` on the `seat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "seat" DROP COLUMN "screenNumber",
ADD COLUMN     "seatNumber" INTEGER;
