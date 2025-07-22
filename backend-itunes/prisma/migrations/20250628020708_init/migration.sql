-- CreateTable
CREATE TABLE "Podcast" (
    "id" SERIAL NOT NULL,
    "trackId" INTEGER NOT NULL,
    "trackName" TEXT NOT NULL,
    "artistName" TEXT NOT NULL,
    "feedUrl" TEXT NOT NULL,
    "artworkUrl600" TEXT NOT NULL,

    CONSTRAINT "Podcast_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Podcast_trackId_key" ON "Podcast"("trackId");
