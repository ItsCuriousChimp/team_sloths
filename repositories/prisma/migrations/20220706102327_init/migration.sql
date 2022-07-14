-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "theater" TEXT NOT NULL,
    "cityId" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);
