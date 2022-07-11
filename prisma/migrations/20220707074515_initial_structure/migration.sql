/*
  Warnings:

  - Made the column `seatNumber` on table `seat` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "seat" ALTER COLUMN "seatNumber" SET NOT NULL;
