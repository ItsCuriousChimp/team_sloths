/*
  Warnings:

  - The primary key for the `city` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `name` on the `city` table. All the data in the column will be lost.
  - The primary key for the `theater` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cityId` on the `theater` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[city]` on the table `city` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city` to the `city` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `theater` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "theater" DROP CONSTRAINT "theater_cityId_fkey";

-- DropIndex
DROP INDEX "city_name_key";

-- AlterTable
ALTER TABLE "city" DROP CONSTRAINT "city_pkey",
DROP COLUMN "name",
ADD COLUMN     "city" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "city_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "city_id_seq";

-- AlterTable
ALTER TABLE "theater" DROP CONSTRAINT "theater_pkey",
DROP COLUMN "cityId",
ADD COLUMN     "city" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "theater_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "theater_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "city_city_key" ON "city"("city");

-- AddForeignKey
ALTER TABLE "theater" ADD CONSTRAINT "theater_city_fkey" FOREIGN KEY ("city") REFERENCES "city"("city") ON DELETE RESTRICT ON UPDATE CASCADE;
