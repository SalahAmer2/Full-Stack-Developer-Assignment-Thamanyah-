// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma.service';

// @Injectable()
// export class RecentsService {
//   constructor(private prisma: PrismaService) {}

//   async addToRecents(userId: number, podcastId: number) {
//     return this.prisma.recent.upsert({
//       where: { userId_podcastId: { userId, podcastId } },
//       update: { createdAt: new Date() }, // refresh timestamp
//       create: { userId, podcastId },
//     });
//   }

//   async getRecents(userId: number) {
//     return this.prisma.recent.findMany({
//       where: { userId },
//       include: { podcast: true },
//       orderBy: { createdAt: 'desc' },
//       take: 20,
//     });
//   }
// }

// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma.service';

// @Injectable()
// export class RecentsService {
//   constructor(private prisma: PrismaService) {}

//   async addToRecents(userId: number, podcastId: string, podcastData?: any) {
//     const bigId = BigInt(podcastId);

//     const recent = await this.prisma.recent.upsert({
//       where: { userId_podcastId: { userId, podcastId: bigId } },
//       update: { createdAt: new Date() },
//       create: { userId, podcastId: bigId },
//     });

//     return {
//       ...recent,
//       podcastId: recent.podcastId.toString(),
//     };
//   }

//   async getRecents(userId: number) {
//     const items = await this.prisma.recent.findMany({
//       where: { userId },
//       include: { podcast: true },
//       orderBy: { createdAt: 'desc' },
//       take: 20,
//     });

//     // ✅ Convert BigInt → string for safe JSON
//     return items.map(item => ({
//       ...item,
//       podcastId: item.podcastId.toString(),
//       podcast: {
//         ...item.podcast,
//         trackId: item.podcast.trackId.toString(),
//       },
//     }));
//   }
// }

// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma.service';

// @Injectable()
// export class RecentsService {
//   constructor(private prisma: PrismaService) {}

//   async addToRecents(userId: number, podcastId: string, podcastData?: any) {
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

//     const recent = await this.prisma.recent.upsert({
//       where: { userId_podcastId: { userId, podcastId: bigId } },
//       update: { createdAt: new Date() },
//       create: { userId, podcastId: bigId },
//     });

//     return {
//       ...recent,
//       podcastId: recent.podcastId.toString(),
//     };
//   }

//   async getRecents(userId: number) {
//     const items = await this.prisma.recent.findMany({
//       where: { userId },
//       include: { podcast: true },
//       orderBy: { createdAt: 'desc' },
//       take: 20,
//     });

//     // ✅ Convert BigInt → string for JSON safety
//     return items.map(item => ({
//       ...item,
//       podcastId: item.podcastId.toString(),
//       podcast: {
//         ...item.podcast,
//         trackId: item.podcast.trackId.toString(),
//       },
//     }));
//   }
// }

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RecentsService {
  constructor(private prisma: PrismaService) {}

  async addToRecents(userId: number, podcastId: string, podcastData?: any) {
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

    const recent = await this.prisma.recent.upsert({
      where: { userId_podcastId: { userId, podcastId: bigId } },
      update: { createdAt: new Date() },
      create: { userId, podcastId: bigId },
      include: { podcast: true },
    });

    return this.serializeRecent(recent);
  }

  async getRecents(userId: number) {
    const items = await this.prisma.recent.findMany({
      where: { userId },
      include: { podcast: true },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return items.map(item => this.serializeRecent(item));
  }

  private serializeRecent(item: any) {
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
