import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RecentsService } from './recents.service';

@Controller('recents')
export class RecentsController {
  constructor(private recentsService: RecentsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  async addToRecents(@Req() req, @Body('podcastId') podcastId: number) {
    return this.recentsService.addToRecents(req.user.sub, podcastId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getRecents(@Req() req) {
    return this.recentsService.getRecents(req.user.sub);
  }
}
