/*
  Warnings:

  - A unique constraint covering the columns `[userId,podcastId]` on the table `Favorite` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,podcastId]` on the table `Queue` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,podcastId]` on the table `Recent` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `podcastId` on the `Favorite` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `podcastId` on the `Queue` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `podcastId` on the `Recent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Favorite" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "podcastId",
ADD COLUMN     "podcastId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Podcast" ALTER COLUMN "feedUrl" DROP NOT NULL,
ALTER COLUMN "artworkUrl600" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Queue" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "podcastId",
ADD COLUMN     "podcastId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Recent" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "podcastId",
ADD COLUMN     "podcastId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userId_podcastId_key" ON "Favorite"("userId", "podcastId");

-- CreateIndex
CREATE UNIQUE INDEX "Queue_userId_podcastId_key" ON "Queue"("userId", "podcastId");

-- CreateIndex
CREATE UNIQUE INDEX "Recent_userId_podcastId_key" ON "Recent"("userId", "podcastId");

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "Podcast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "Podcast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recent" ADD CONSTRAINT "Recent_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "Podcast"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
