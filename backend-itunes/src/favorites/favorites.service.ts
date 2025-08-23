// favorites.service.ts
// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma.service';

// @Injectable()
// export class FavoritesService {
//   constructor(private prisma: PrismaService) {}

//   async addToFavorites(userId: number, podcastId: string) {
//     return this.prisma.favorite.create({
//       data: { userId, podcastId },
//     });
//   }

//   async getFavorites(userId: number) {
//     return this.prisma.favorite.findMany({
//       where: { userId },
//     });
//   }
// }

// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma.service';

// @Injectable()
// export class FavoritesService {
//   constructor(private prisma: PrismaService) {}

//   async getFavorites(userId: number) {
//     return this.prisma.favorite.findMany({
//       where: { userId },
//       include: { podcast: true },
//       orderBy: { id: 'desc' },
//     });
//   }

//   async addToFavorites(userId: number, podcastId: number) {
//     return this.prisma.favorite.upsert({
//       where: { userId_podcastId: { userId, podcastId } },
//       update: {},
//       create: { userId, podcastId },
//     });
//   }

//   async removeFromFavorites(userId: number, podcastId: number) {
//     return this.prisma.favorite.delete({
//       where: { userId_podcastId: { userId, podcastId } },
//     });
//   }
// }

// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma.service';

// @Injectable()
// export class FavoritesService {
//   constructor(private prisma: PrismaService) {}

//   async getFavorites(userId: number) {
//     const items = await this.prisma.favorite.findMany({
//       where: { userId },
//       include: { podcast: true },
//       orderBy: { id: 'desc' },
//     });

//     // Convert BigInt → string for JSON
//     return items.map(item => ({
//       ...item,
//       podcastId: item.podcastId.toString(),
//       podcast: {
//         ...item.podcast,
//         trackId: item.podcast.trackId.toString(),
//       },
//     }));
//   }

//   async addToFavorites(userId: number, podcastId: string, podcastData?: any) {
//     const bigId = BigInt(podcastId);

//     // 👇 Ensure Podcast exists with previewUrl + metadata
//     await this.prisma.podcast.upsert({
//       where: { trackId: bigId },
//       update: {
//         previewUrl: podcastData?.previewUrl || null,
//       },
//       create: {
//         trackId: bigId,
//         trackName: podcastData?.trackName || 'Unknown',
//         artistName: podcastData?.artistName || 'Unknown',
//         feedUrl: podcastData?.feedUrl || null,
//         artworkUrl600: podcastData?.artworkUrl600 || null,
//         previewUrl: podcastData?.previewUrl || null,
//       },
//     });

//     return this.prisma.favorite.upsert({
//       where: { userId_podcastId: { userId, podcastId: bigId } },
//       update: {},
//       create: { userId, podcastId: bigId },
//     });
//   }

//   async removeFromFavorites(userId: number, podcastId: string) {
//     return this.prisma.favorite.delete({
//       where: { userId_podcastId: { userId, podcastId: BigInt(podcastId) } },
//     });
//   }
// }

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getFavorites(userId: number) {
    const items = await this.prisma.favorite.findMany({
      where: { userId },
      include: { podcast: true },
      orderBy: { id: 'desc' },
    });

    return items.map(item => this.serializeFavorite(item));
  }

  async addToFavorites(userId: number, podcastId: string, podcastData?: any) {
    const bigId = BigInt(podcastId);

    // Ensure podcast exists
    // await this.prisma.podcast.upsert({
    //   where: { trackId: bigId },
    //   update: {},
    //   create: {
    //     trackId: bigId,
    //     trackName: podcastData?.trackName || 'Unknown',
    //     artistName: podcastData?.artistName || 'Unknown',
    //     feedUrl: podcastData?.feedUrl || null,
    //     artworkUrl600: podcastData?.artworkUrl600 || null,
    //     previewUrl: podcastData?.previewUrl || null,
    //   },
    // });

    // Ensure podcast exists
    await this.prisma.podcast.upsert({
      where: { trackId: bigId },
      update: {
        trackName: podcastData?.trackName,
        artistName: podcastData?.artistName,
        artworkUrl600: podcastData?.artworkUrl600,
        feedUrl: podcastData?.feedUrl,
        releaseDate: podcastData?.releaseDate ? new Date(podcastData.releaseDate) : null,
        audioUrl: podcastData?.previewUrl || podcastData?.audioUrl || null, // ✅ ensure stored
      },
      create: {
        trackId: bigId,
        trackName: podcastData?.trackName || "Unknown",
        artistName: podcastData?.artistName || "Unknown",
        artworkUrl600: podcastData?.artworkUrl600 || null,
        feedUrl: podcastData?.feedUrl || null,
        releaseDate: podcastData?.releaseDate ? new Date(podcastData.releaseDate) : null,
        audioUrl: podcastData?.previewUrl || podcastData?.audioUrl || null, // ✅ ensure stored
      },
    });

    const fav = await this.prisma.favorite.upsert({
      where: { userId_podcastId: { userId, podcastId: bigId } },
      update: {},
      create: { userId, podcastId: bigId },
      include: { podcast: true },
    });

    return this.serializeFavorite(fav);
  }

  async removeFromFavorites(userId: number, podcastId: string) {
    const removed = await this.prisma.favorite.delete({
      where: { userId_podcastId: { userId, podcastId: BigInt(podcastId) } },
      include: { podcast: true },
    });

    return this.serializeFavorite(removed);
  }

  private serializeFavorite(item: any) {
    return {
      // ...item,
      // podcastId: item.podcastId.toString(),
      // podcast: item.podcast
      //   ? {
      //       ...item.podcast,
      //       trackId: item.podcast.trackId.toString(),
      //     }
      //   : null,

      ...item,
      podcastId: item.podcastId.toString(),
      podcast: {
        ...item.podcast,
        trackId: item.podcast.trackId.toString(),
        audioUrl: item.podcast.audioUrl || null,
        artworkUrl600: item.podcast.artworkUrl600 || null,
        releaseDate: item.podcast.releaseDate ? item.podcast.releaseDate.toISOString() : null,
      },
    };
  }
}
