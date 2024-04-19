/*
  Warnings:

  - The values [CONFIRMED,TENTATIVE] on the enum `EventStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EventStatus_new" AS ENUM ('confirmed', 'tentative');
ALTER TABLE "Event" ALTER COLUMN "status" TYPE "EventStatus_new" USING ("status"::text::"EventStatus_new");
ALTER TYPE "EventStatus" RENAME TO "EventStatus_old";
ALTER TYPE "EventStatus_new" RENAME TO "EventStatus";
DROP TYPE "EventStatus_old";
COMMIT;
