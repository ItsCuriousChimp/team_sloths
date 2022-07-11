/*
  Warnings:

  - You are about to drop the column `duration` on the `movie` table. All the data in the column will be lost.
  - Added the required column `durationInMins` to the `movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "movie" DROP COLUMN "duration",
ADD COLUMN     "durationInMins" INTEGER NOT NULL;
