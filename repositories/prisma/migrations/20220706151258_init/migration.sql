/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `city` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "theater" DROP CONSTRAINT "theater_cityId_fkey";

-- AlterTable
ALTER TABLE "theater" ALTER COLUMN "cityId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "city_name_key" ON "city"("name");

-- AddForeignKey
ALTER TABLE "theater" ADD CONSTRAINT "theater_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
