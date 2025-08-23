/*
  Warnings:

  - A unique constraint covering the columns `[podcastId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[podcastId]` on the table `Queue` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[podcastId]` on the table `Recent` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "public"."Favorite" DROP CONSTRAINT "Favorite_podcastId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Queue" DROP CONSTRAINT "Queue_podcastId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Recent" DROP CONSTRAINT "Recent_podcastId_fkey";

-- AlterTable
ALTER TABLE "public"."Favorite" ALTER COLUMN "podcastId" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "public"."Podcast" ALTER COLUMN "trackId" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "public"."Queue" ALTER COLUMN "podcastId" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "public"."Recent" ALTER COLUMN "podcastId" SET DATA TYPE BIGINT;

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_podcastId_key" ON "public"."Favorite"("podcastId");

-- CreateIndex
CREATE UNIQUE INDEX "Queue_podcastId_key" ON "public"."Queue"("podcastId");

-- CreateIndex
CREATE UNIQUE INDEX "Recent_podcastId_key" ON "public"."Recent"("podcastId");

-- AddForeignKey
ALTER TABLE "public"."Queue" ADD CONSTRAINT "Queue_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "public"."Podcast"("trackId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Favorite" ADD CONSTRAINT "Favorite_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "public"."Podcast"("trackId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Recent" ADD CONSTRAINT "Recent_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "public"."Podcast"("trackId") ON DELETE RESTRICT ON UPDATE CASCADE;
