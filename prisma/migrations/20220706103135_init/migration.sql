/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "theater" (
    "id" SERIAL NOT NULL,
    "theater" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,

    CONSTRAINT "theater_pkey" PRIMARY KEY ("id")
);
