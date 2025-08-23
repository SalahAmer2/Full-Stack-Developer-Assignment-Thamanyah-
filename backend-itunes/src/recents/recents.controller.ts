// import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { RecentsService } from './recents.service';

// @Controller('recents')
// export class RecentsController {
//   constructor(private recentsService: RecentsService) {}

//   @UseGuards(AuthGuard('jwt'))
//   @Post('add')
//   async addToRecents(@Req() req, @Body('podcastId') podcastId: number) {
//     return this.recentsService.addToRecents(req.user.sub, podcastId);
//   }

//   @UseGuards(AuthGuard('jwt'))
//   @Get()
//   async getRecents(@Req() req) {
//     return this.recentsService.getRecents(req.user.sub);
//   }
// }

// import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
// import { RecentsService } from './recents.service';
// import { AuthGuard } from '@nestjs/passport';

// @Controller('recents')
// export class RecentsController {
//   constructor(private readonly recentsService: RecentsService) {}

//   @UseGuards(AuthGuard('jwt'))
//   @Post('add')
//   async addToRecents(@Request() req, @Body('podcastId') podcastId: string) {
//     return this.recentsService.addToRecents(req.user.userId, podcastId);
//   }

//   @UseGuards(AuthGuard('jwt'))
//   @Get()
//   async getRecents(@Request() req) {
//     return this.recentsService.getRecents(req.user.userId);
//   }
// }

import { Controller, Post, Body, Get, UseGuards, Request  } from '@nestjs/common';
import { RecentsService } from './recents.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('recents')
export class RecentsController {
  constructor(private readonly recentsService: RecentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async addToRecents(@Request() req, @Body('podcastId') podcastId: string) {
    return this.recentsService.addToRecents(req.user.userId, podcastId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getRecents(@Request() req) {
    return this.recentsService.getRecents(req.user.userId);
  }
}

