-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TentativeSchedule" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "duration" INTEGER NOT NULL,
    "startSecureTime" TIMESTAMP(3) NOT NULL,
    "endSecureTime" TIMESTAMP(3) NOT NULL,
    "margin" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TentativeSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TentativeDate" (
    "id" SERIAL NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "tentativeScheduleId" INTEGER NOT NULL,

    CONSTRAINT "TentativeDate_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TentativeSchedule" ADD CONSTRAINT "TentativeSchedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TentativeDate" ADD CONSTRAINT "TentativeDate_tentativeScheduleId_fkey" FOREIGN KEY ("tentativeScheduleId") REFERENCES "TentativeSchedule"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
