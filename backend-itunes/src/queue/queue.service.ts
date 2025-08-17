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

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class QueueService {
  constructor(private prisma: PrismaService) {}

  async getQueue(userId: number) {
    return this.prisma.queue.findMany({
      where: { userId },
      include: { podcast: true },
      orderBy: { id: 'desc' },
    });
  }

  async addToQueue(userId: number, podcastId: number) {
    return this.prisma.queue.upsert({
      where: { userId_podcastId: { userId, podcastId } },
      update: {},
      create: { userId, podcastId },
    });
  }

  async removeFromQueue(userId: number, podcastId: number) {
    return this.prisma.queue.delete({
      where: { userId_podcastId: { userId, podcastId } },
    });
  }
}
