/*
  Warnings:

  - You are about to drop the column `screenNumber` on the `Seat` table. All the data in the column will be lost.
  - Added the required column `seatNumber` to the `Seat` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seat" DROP COLUMN "screenNumber",
ADD COLUMN     "seatNumber" INTEGER NOT NULL;
