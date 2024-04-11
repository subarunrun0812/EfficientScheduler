-- CreateTable
CREATE TABLE "User_DB" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_DB_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TentativeSchedule_DB" (
    "id" SERIAL NOT NULL,
    "TentativeScheduleId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "duration" INTEGER NOT NULL,
    "startSecureTime" TIMESTAMP(3) NOT NULL,
    "endSecureTime" TIMESTAMP(3) NOT NULL,
    "margin" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TentativeSchedule_DB_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TentativeDate_DB" (
    "id" SERIAL NOT NULL,
    "tentativeDateId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "tentativeScheduleId" INTEGER NOT NULL,

    CONSTRAINT "TentativeDate_DB_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_DB_user_id_key" ON "User_DB"("user_id");

-- AddForeignKey
ALTER TABLE "TentativeSchedule_DB" ADD CONSTRAINT "TentativeSchedule_DB_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User_DB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TentativeDate_DB" ADD CONSTRAINT "TentativeDate_DB_tentativeScheduleId_fkey" FOREIGN KEY ("tentativeScheduleId") REFERENCES "TentativeSchedule_DB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
