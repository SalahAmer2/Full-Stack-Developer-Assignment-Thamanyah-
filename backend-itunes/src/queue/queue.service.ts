// queue.service.ts
// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma.service';

// @Injectable()
// export class QueueService {
//   constructor(private prisma: PrismaService) {}

//   async addToQueue(userId: number, podcastId: string) {
//     return this.prisma.queue.create({
//       data: { userId, podcastId },
//     });
//   }

//   async getQueue(userId: number) {
//     return this.prisma.queue.findMany({
//       where: { userId },
//     });
//   }
// }

// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma.service';

// @Injectable()
// export class QueueService {
//   constructor(private prisma: PrismaService) {}

//   async addToQueue(userId: number, podcastId: number) {
//     return this.prisma.queue.upsert({
//       where: { userId_podcastId: { userId, podcastId } },
//       update: {},
//       create: { userId, podcastId },
//     });
//   }

//   async getQueue(userId: number) {
//     return this.prisma.queue.findMany({
//       where: { userId },
//       include: { podcast: true },
//       orderBy: { createdAt: 'desc' },
//     });
//   }
// }

// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma.service';

// @Injectable()
// export class QueueService {
//   constructor(private prisma: PrismaService) {}

//   async getQueue(userId: number) {
//     const items = await this.prisma.queue.findMany({
//       where: { userId },
//       include: { podcast: true },
//       orderBy: { id: 'desc' },
//     });

//     // Convert BigInt → string (safe for JSON)
//     return items.map(item => ({
//       ...item,
//       podcastId: item.podcastId.toString(),
//       podcast: {
//         ...item.podcast,
//         trackId: item.podcast.trackId.toString(),
//       }
//     }));
//   }

//   async addToQueue(userId: number, podcastId: bigint, podcastData?: any) {
//     await this.prisma.podcast.upsert({
//       where: { trackId: podcastId }, // ✅ podcastId is bigint now
//       update: {},
//       create: {
//         trackId: podcastId,
//         trackName: podcastData?.trackName || "Unknown",
//         artistName: podcastData?.artistName || "Unknown",
//         feedUrl: podcastData?.feedUrl || null,
//         artworkUrl600: podcastData?.artworkUrl600 || null,
//       },
//     });

//     return this.prisma.queue.upsert({
//       where: { userId_podcastId: { userId, podcastId } },
//       update: {},
//       create: { userId, podcastId },
//     });
//   }

//   async removeFromQueue(userId: number, podcastId: bigint) {
//     return this.prisma.queue.delete({
//       where: { userId_podcastId: { userId, podcastId } },
//     });
//   }

// }

// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma.service';

// @Injectable()
// export class QueueService {
//   constructor(private prisma: PrismaService) {}

//   async getQueue(userId: number) {
//     const items = await this.prisma.queue.findMany({
//       where: { userId },
//       include: { podcast: true },
//       orderBy: { id: 'desc' },
//     });

//     // Convert BigInt → string for JSON safety
//     return items.map(item => ({
//       ...item,
//       podcastId: item.podcastId.toString(),
//       podcast: {
//         ...item.podcast,
//         trackId: item.podcast.trackId.toString(),
//       },
//     }));
//   }

//   async addToQueue(userId: number, podcastId: bigint, podcastData?: any) {
//     // Ensure podcast exists in DB
//     await this.prisma.podcast.upsert({
//       where: { trackId: podcastId },
//       update: {},
//       create: {
//         trackId: podcastId,
//         trackName: podcastData?.trackName || 'Unknown',
//         artistName: podcastData?.artistName || 'Unknown',
//         feedUrl: podcastData?.feedUrl || null,
//         artworkUrl600: podcastData?.artworkUrl600 || null,
//       },
//     });

//     return this.prisma.queue.upsert({
//       where: { userId_podcastId: { userId, podcastId } }, // ✅ both BigInt + Int handled correctly
//       update: {},
//       create: { userId, podcastId },
//     });
//   }

//   async removeFromQueue(userId: number, podcastId: bigint) {
//     return this.prisma.queue.delete({
//       where: { userId_podcastId: { userId, podcastId } },
//     });
//   }
// }

// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma.service';

// @Injectable()
// export class QueueService {
//   constructor(private prisma: PrismaService) {}

//   async getQueue(userId: number) {
//     const items = await this.prisma.queue.findMany({
//       where: { userId },
//       include: { podcast: true },
//       orderBy: { id: 'desc' },
//     });

//     // Convert BigInt → string for safe JSON
//     return items.map(item => ({
//       ...item,
//       podcastId: item.podcastId.toString(),
//       podcast: {
//         ...item.podcast,
//         trackId: item.podcast.trackId.toString(),
//       },
//     }));
//   }

//   async addToQueue(userId: number, podcastId: string, podcastData?: any) {
//     const bigId = BigInt(podcastId);

//     await this.prisma.podcast.upsert({
//       where: { trackId: bigId },
//       update: {},
//       create: {
//         trackId: bigId,
//         trackName: podcastData?.trackName || 'Unknown',
//         artistName: podcastData?.artistName || 'Unknown',
//         feedUrl: podcastData?.feedUrl || null,
//         artworkUrl600: podcastData?.artworkUrl600 || null,
//       },
//     });

//     return this.prisma.queue.upsert({
//       where: { userId_podcastId: { userId, podcastId: bigId } },
//       update: {},
//       create: { userId, podcastId: bigId },
//     });
//   }

//   async removeFromQueue(userId: number, podcastId: string) {
//     return this.prisma.queue.delete({
//       where: { userId_podcastId: { userId, podcastId: BigInt(podcastId) } },
//     });
//   }
// }

// import { Injectable } from '@nestjs/common';
// import { PrismaService } from '../prisma.service';

// @Injectable()
// export class QueueService {
//   constructor(private prisma: PrismaService) {}

//   async getQueue(userId: number) {
//     const items = await this.prisma.queue.findMany({
//       where: { userId },
//       include: { podcast: true },
//       orderBy: { id: 'desc' },
//     });

//     // ✅ Convert BigInt → string for JSON
//     return items.map((item) => ({
//       ...item,
//       podcastId: item.podcastId.toString(),
//       podcast: {
//         ...item.podcast,
//         trackId: item.podcast.trackId.toString(),
//       },
//     }));
//   }

//   // async addToQueue(userId: number, podcastId: string, podcastData?: any) {
//   //   const bigId = BigInt(podcastId);

//   //   // ✅ Ensure podcast exists in DB
//   //   await this.prisma.podcast.upsert({
//   //     where: { trackId: bigId },
//   //     update: {},
//   //     create: {
//   //       trackId: bigId,
//   //       trackName: podcastData?.trackName || "Unknown",
//   //       artistName: podcastData?.artistName || "Unknown",
//   //       feedUrl: podcastData?.feedUrl || null,
//   //       artworkUrl600: podcastData?.artworkUrl600 || null,
//   //       previewUrl: podcastData?.previewUrl || null,  // ✅
//   //     },
//   //   });

//   //   // ✅ Add to queue
//   //   const item = await this.prisma.queue.upsert({
//   //     where: { userId_podcastId: { userId, podcastId: bigId } },
//   //     update: {},
//   //     create: { userId, podcastId: bigId },
//   //     include: { podcast: true },
//   //   });

//   //   // ✅ Convert BigInt → string
//   //   return {
//   //     ...item,
//   //     podcastId: item.podcastId.toString(),
//   //     podcast: {
//   //       ...item.podcast,
//   //       trackId: item.podcast.trackId.toString(),
//   //     },
//   //   };
//   // }

//   async addToQueue(userId: number, podcastId: string, podcastData?: any) {
//     const bigId = BigInt(podcastId);

//     await this.prisma.podcast.upsert({
//       where: { trackId: bigId },
//       update: {
//         previewUrl: podcastData?.previewUrl || null, // 👈 keep it updated
//       },
//       create: {
//         trackId: bigId,
//         trackName: podcastData?.trackName || "Unknown",
//         artistName: podcastData?.artistName || "Unknown",
//         feedUrl: podcastData?.feedUrl || null,
//         artworkUrl600: podcastData?.artworkUrl600 || null,
//         previewUrl: podcastData?.previewUrl || null, // 👈 save on create
//       },
//     });

//     return this.prisma.queue.upsert({
//       where: { userId_podcastId: { userId, podcastId: bigId } },
//       update: {},
//       create: { userId, podcastId: bigId },
//     });
//   }


//   async removeFromQueue(userId: number, podcastId: string) {
//     const bigId = BigInt(podcastId);

//     const item = await this.prisma.queue.delete({
//       where: { userId_podcastId: { userId, podcastId: bigId } },
//       include: { podcast: true },
//     });

//     // ✅ Convert BigInt → string
//     return {
//       ...item,
//       podcastId: item.podcastId.toString(),
//       podcast: {
//         ...item.podcast,
//         trackId: item.podcast.trackId.toString(),
//       },
//     };
//   }
// }

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class QueueService {
  constructor(private prisma: PrismaService) {}

  async getQueue(userId: number) {
    const items = await this.prisma.queue.findMany({
      where: { userId },
      include: { podcast: true },
      orderBy: { id: 'desc' },
    });

    return items.map(item => this.serializeQueueItem(item));
  }

  async addToQueue(userId: number, podcastId: string, podcastData?: any) {
    const bigId = BigInt(podcastId);

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

    const queueItem = await this.prisma.queue.upsert({
      where: { userId_podcastId: { userId, podcastId: bigId } },
      update: {},
      create: { userId, podcastId: bigId },
      include: { podcast: true }, // 👈 also fetch podcast so frontend can use it immediately
    });

    return this.serializeQueueItem(queueItem); // ✅ convert before returning
  }

  async removeFromQueue(userId: number, podcastId: string) {
    const removed = await this.prisma.queue.delete({
      where: { userId_podcastId: { userId, podcastId: BigInt(podcastId) } },
      include: { podcast: true },
    });

    return this.serializeQueueItem(removed); // ✅ convert before returning
  }

  private serializeQueueItem(item: any) {
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
