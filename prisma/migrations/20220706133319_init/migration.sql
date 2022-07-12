/*
  Warnings:

  - Changed the type of `cityId` on the `theater` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "theater" DROP COLUMN "cityId",
ADD COLUMN     "cityId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "city" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "theater" ADD CONSTRAINT "theater_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
