/*
  Warnings:

  - Added the required column `numberOfSeats` to the `theater` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "theater" ADD COLUMN     "numberOfSeats" INTEGER NOT NULL;
