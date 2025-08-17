// // queue.controller.ts
// import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
// import { QueueService } from './queue.service';
// import { AuthGuard } from '@nestjs/passport';

// @Controller('queue')
// export class QueueController {
//   constructor(private queueService: QueueService) {}

//   @UseGuards(AuthGuard('jwt'))
//   @Post('add')
//   addToQueue(@Req() req, @Body() body: { podcastId: string }) {
//     return this.queueService.addToQueue(req.user.userId, body.podcastId);
//   }

//   @UseGuards(AuthGuard('jwt'))
//   @Get()
//   getQueue(@Req() req) {
//     return this.queueService.getQueue(req.user.userId);
//   }
// }

import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { QueueService } from './queue.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getQueue(@Request() req) {
    return this.queueService.getQueue(req.user.userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async addToQueue(@Request() req, @Body('podcastId') podcastId: number) {
    return this.queueService.addToQueue(req.user.userId, podcastId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('remove')
  async removeFromQueue(@Request() req, @Body('podcastId') podcastId: number) {
    return this.queueService.removeFromQueue(req.user.userId, podcastId);
  }
}
