// // favorites.controller.ts
// import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
// import { FavoritesService } from './favorites.service';
// import { AuthGuard } from '@nestjs/passport';

// @Controller('favorites')
// export class FavoritesController {
//   constructor(private favoritesService: FavoritesService) {}

//   @UseGuards(AuthGuard('jwt'))
//   @Post('add')
//   addToFavorites(@Req() req, @Body() body: { podcastId: string }) {
//     return this.favoritesService.addToFavorites(req.user.userId, body.podcastId);
//   }

//   @UseGuards(AuthGuard('jwt'))
//   @Get()
//   getFavorites(@Req() req) {
//     return this.favoritesService.getFavorites(req.user.userId);
//   }
// }

// import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
// import { FavoritesService } from './favorites.service';
// import { AuthGuard } from '@nestjs/passport';

// @Controller('favorites')
// export class FavoritesController {
//   constructor(private readonly favoritesService: FavoritesService) {}

//   @UseGuards(AuthGuard('jwt'))
//   @Get()
//   async getFavorites(@Request() req) {
//     return this.favoritesService.getFavorites(req.user.userId);
//   }

//   @UseGuards(AuthGuard('jwt'))
//   @Post('add')
//   async addToFavorites(@Request() req, @Body('podcastId') podcastId: number) {
//     return this.favoritesService.addToFavorites(req.user.userId, podcastId);
//   }

//   @UseGuards(AuthGuard('jwt'))
//   @Post('remove')
//   async removeFromFavorites(@Request() req, @Body('podcastId') podcastId: number) {
//     return this.favoritesService.removeFromFavorites(req.user.userId, podcastId);
//   }
// }

import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getFavorites(@Request() req) {
    return this.favoritesService.getFavorites(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async addToFavorites(@Request() req, @Body('podcastId') podcastId: string) {
    return this.favoritesService.addToFavorites(req.user.userId, podcastId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('remove')
  async removeFromFavorites(@Request() req, @Body('podcastId') podcastId: string) {
    return this.favoritesService.removeFromFavorites(req.user.userId, podcastId);
  }
}

