-- DropForeignKey
ALTER TABLE "public"."Recent" DROP CONSTRAINT "Recent_podcastId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Recent" ADD CONSTRAINT "Recent_podcastId_fkey" FOREIGN KEY ("podcastId") REFERENCES "public"."Podcast"("trackId") ON DELETE RESTRICT ON UPDATE CASCADE;
