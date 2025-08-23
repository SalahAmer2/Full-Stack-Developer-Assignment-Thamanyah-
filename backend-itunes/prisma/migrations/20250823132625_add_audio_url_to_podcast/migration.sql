/*
  Warnings:

  - You are about to drop the column `previewUrl` on the `Podcast` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Podcast" DROP COLUMN "previewUrl",
ADD COLUMN     "audioUrl" TEXT,
ADD COLUMN     "releaseDate" TIMESTAMP(3);
