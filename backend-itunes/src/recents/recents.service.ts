import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RecentsService {
  constructor(private prisma: PrismaService) {}

  async addToRecents(userId: number, podcastId: number) {
    return this.prisma.recent.upsert({
      where: { userId_podcastId: { userId, podcastId } },
      update: { createdAt: new Date() }, // refresh timestamp
      create: { userId, podcastId },
    });
  }

  async getRecents(userId: number) {
    return this.prisma.recent.findMany({
      where: { userId },
      include: { podcast: true },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
  }
}
