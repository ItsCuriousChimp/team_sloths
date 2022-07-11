-- DropForeignKey
ALTER TABLE "theater" DROP CONSTRAINT "theater_cityId_fkey";

-- AddForeignKey
ALTER TABLE "theater" ADD CONSTRAINT "theater_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
