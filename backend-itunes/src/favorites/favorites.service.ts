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

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async getFavorites(userId: number) {
    return this.prisma.favorite.findMany({
      where: { userId },
      include: { podcast: true },
      orderBy: { id: 'desc' },
    });
  }

  async addToFavorites(userId: number, podcastId: number) {
    return this.prisma.favorite.upsert({
      where: { userId_podcastId: { userId, podcastId } },
      update: {},
      create: { userId, podcastId },
    });
  }

  async removeFromFavorites(userId: number, podcastId: number) {
    return this.prisma.favorite.delete({
      where: { userId_podcastId: { userId, podcastId } },
    });
  }
}
