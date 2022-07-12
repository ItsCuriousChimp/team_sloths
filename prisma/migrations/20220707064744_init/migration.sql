/*
  Warnings:

  - You are about to drop the column `city` on the `city` table. All the data in the column will be lost.
  - You are about to drop the column `city` on the `theater` table. All the data in the column will be lost.
  - You are about to drop the column `theater` on the `theater` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `city` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `city` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityId` to the `theater` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `theater` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "theater" DROP CONSTRAINT "theater_city_fkey";

-- DropIndex
DROP INDEX "city_city_key";

-- AlterTable
ALTER TABLE "city" DROP COLUMN "city",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "theater" DROP COLUMN "city",
DROP COLUMN "theater",
ADD COLUMN     "cityId" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "city_name_key" ON "city"("name");

-- AddForeignKey
ALTER TABLE "theater" ADD CONSTRAINT "theater_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
