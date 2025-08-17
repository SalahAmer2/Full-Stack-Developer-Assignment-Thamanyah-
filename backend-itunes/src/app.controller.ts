import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('search')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async search(@Query('term') term: string): Promise<any> {
    return this.appService.searchAndStore(term);
  }
  @Get('trending')
  async trending(): Promise<any> {
    return this.appService.getTrending();
  }

  @Get('trending-by-genre')
  async trendingByGenre(@Query('genre') genre: string): Promise<any> {
    return this.appService.getTrendingByGenre(genre);
  }

  // @Post('recents/add')
  // @UseGuards(AuthGuard('jwt'))
  // async addRecent(@Req() req, @Body('podcastId') podcastId: number) {
  //   return this.recentsService.addToRecents(req.user.sub, podcastId);
  // }

}
