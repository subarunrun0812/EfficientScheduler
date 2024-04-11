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
CREATE TABLE "Event_DB" (
    "id" SERIAL NOT NULL,
    "event_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "duration" INTEGER NOT NULL,
    "startSecureTime" TIMESTAMP(3) NOT NULL,
    "endSecureTime" TIMESTAMP(3) NOT NULL,
    "margin" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Event_DB_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimeSlot_DB" (
    "id" SERIAL NOT NULL,
    "TentativeDate_Id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "event_id" INTEGER NOT NULL,

    CONSTRAINT "TimeSlot_DB_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_DB_user_id_key" ON "User_DB"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Event_DB_event_id_key" ON "Event_DB"("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "TimeSlot_DB_TentativeDate_Id_key" ON "TimeSlot_DB"("TentativeDate_Id");

-- AddForeignKey
ALTER TABLE "Event_DB" ADD CONSTRAINT "Event_DB_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User_DB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeSlot_DB" ADD CONSTRAINT "TimeSlot_DB_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event_DB"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
