/*
  Warnings:

  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `BookedSeat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Booking` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `City` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Screen` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Seat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Show` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Theatre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "BookedSeat" DROP CONSTRAINT "BookedSeat_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "BookedSeat" DROP CONSTRAINT "BookedSeat_seatId_fkey";

-- DropForeignKey
ALTER TABLE "BookedSeat" DROP CONSTRAINT "BookedSeat_showId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_showId_fkey";

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_userId_fkey";

-- DropForeignKey
ALTER TABLE "Screen" DROP CONSTRAINT "Screen_theatreId_fkey";

-- DropForeignKey
ALTER TABLE "Seat" DROP CONSTRAINT "Seat_screenId_fkey";

-- DropForeignKey
ALTER TABLE "Show" DROP CONSTRAINT "Show_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Show" DROP CONSTRAINT "Show_screenId_fkey";

-- DropForeignKey
ALTER TABLE "Theatre" DROP CONSTRAINT "Theatre_cityId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_cityId_fkey";

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "BookedSeat";

-- DropTable
DROP TABLE "Booking";

-- DropTable
DROP TABLE "City";

-- DropTable
DROP TABLE "Movie";

-- DropTable
DROP TABLE "Screen";

-- DropTable
DROP TABLE "Seat";

-- DropTable
DROP TABLE "Show";

-- DropTable
DROP TABLE "Theatre";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "theatre" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(64) NOT NULL,
    "cityId" TEXT NOT NULL,
    "numberOfScreens" INTEGER NOT NULL,

    CONSTRAINT "theatre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "city" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(64) NOT NULL,

    CONSTRAINT "city_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "screen" (
    "id" TEXT NOT NULL,
    "theatreId" TEXT NOT NULL,
    "screenNumber" INTEGER NOT NULL,

    CONSTRAINT "screen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "show" (
    "id" TEXT NOT NULL,
    "screenId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "showStartTimeInUtc" TIMESTAMP(3) NOT NULL,
    "showEndTimeInUtc" TIMESTAMP(3) NOT NULL,
    "availableUntilUtc" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "show_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "movie" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "durationInMins" INTEGER NOT NULL,
    "language" VARCHAR(32) NOT NULL,

    CONSTRAINT "movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seat" (
    "id" TEXT NOT NULL,
    "screenId" TEXT NOT NULL,
    "seatNumber" INTEGER NOT NULL,

    CONSTRAINT "seat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bookedSeat" (
    "id" TEXT NOT NULL,
    "seatId" TEXT NOT NULL,
    "showId" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,

    CONSTRAINT "bookedSeat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "showId" TEXT NOT NULL,
    "numberOfSeatsBooked" INTEGER NOT NULL,
    "showDate" DATE NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(128) NOT NULL,
    "email" VARCHAR(64) NOT NULL,
    "cityId" TEXT NOT NULL,
    "phoneNumber" VARCHAR(16) NOT NULL,
    "loggedInAtUtc" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" VARCHAR(128) NOT NULL,
    "password" VARCHAR(32) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "theatre" ADD CONSTRAINT "theatre_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "screen" ADD CONSTRAINT "screen_theatreId_fkey" FOREIGN KEY ("theatreId") REFERENCES "theatre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "show" ADD CONSTRAINT "show_screenId_fkey" FOREIGN KEY ("screenId") REFERENCES "screen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "show" ADD CONSTRAINT "show_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seat" ADD CONSTRAINT "seat_screenId_fkey" FOREIGN KEY ("screenId") REFERENCES "screen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookedSeat" ADD CONSTRAINT "bookedSeat_showId_fkey" FOREIGN KEY ("showId") REFERENCES "show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookedSeat" ADD CONSTRAINT "bookedSeat_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "seat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bookedSeat" ADD CONSTRAINT "bookedSeat_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_showId_fkey" FOREIGN KEY ("showId") REFERENCES "show"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
