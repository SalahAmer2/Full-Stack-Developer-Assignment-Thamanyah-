import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(
    private readonly http: HttpService,
    private readonly prisma: PrismaService
  ) { }

  async searchAndStore(term: string): Promise<any> {
    const url = 'https://itunes.apple.com/search';
    const response = await this.http.axiosRef.get(url, {
      params: { term, entity: 'podcast' }
    });

    const podcasts = response.data.results.map((item) => ({
      trackId: item.trackId,
      trackName: item.trackName,
      artistName: item.artistName,
      feedUrl: item.feedUrl,
      artworkUrl600: item.artworkUrl600
    }));

    for (const podcast of podcasts) {
      await this.prisma.podcast.upsert({
        where: { trackId: podcast.trackId },
        update: {},
        create: podcast
      });
    }

    // return this.prisma.podcast.findMany();
    return podcasts; // ✅ Return only fresh results
  }
  
  // async getTrending(): Promise<any[]> {
  //   const url = 'https://itunes.apple.com/search';
  //   const response = await this.http.axiosRef.get(url, {
  //     params: {
  //       term: 'popular', // This is a broad term to get trending content
  //       entity: 'podcast',
  //       limit: 20
  //     }
  //   });
  
  //   return response.data.results;
  // }  

  // async getTrending(): Promise<any[]> {
  //   const url = 'https://itunes.apple.com/us/rss/toppodcasts/limit=20/genre=0/json';

  //   const response = await this.http.axiosRef.get(url);

  //   const podcasts = response.data.feed?.entry || [];

  //   // Normalize format to match your frontend PodcastCard usage
  //   return podcasts.map((entry: any, index: number) => ({
  //     id: index,
  //     trackId: entry.id?.attributes['im:id'] || index,
  //     trackName: entry['im:name']?.label || 'Untitled',
  //     artistName: entry['im:artist']?.label || 'Unknown Artist',
  //     artworkUrl600: entry['im:image']?.slice(-1)[0]?.label || '', // highest res
  //   }));
  // }

  async getTrending(): Promise<any[]> {
  const trendingTerms = ['Joe Rogan', 'true crime', 'history', 'news', 'comedy'];
  const randomTerm = trendingTerms[Math.floor(Math.random() * trendingTerms.length)];

  //const url = 'https://itunes.apple.com/search'; //https://itunes.apple.com/search?term=top&media=podcast&entity=podcast&limit=20
  const url = 'https://itunes.apple.com/search?term=top&media=podcast&entity=podcast&limit=20';
  // const response = await this.http.axiosRef.get(url, {
  //   params: {
  //     term: randomTerm,
  //     media: 'podcast',
  //     entity: 'podcast', // ✅ Get shows, not episodes
  //     limit: 20,
  //   },
  // });
  const response = await this.http.axiosRef.get(url);

  const shows = response.data.results.map((item: any) => ({
    trackId: item.trackId,
    trackName: item.trackName,
    artistName: item.artistName,
    artworkUrl600: item.artworkUrl600,
    feedUrl: item.feedUrl,
    collectionName: item.collectionName,
  }));

  // ✅ Save to Prisma
  for (const show of shows) {
    await this.prisma.podcast.upsert({
      where: { trackId: show.trackId },
      update: {}, // you can optionally update if needed
      create: show,
    });
  }

  return shows;
}


  // async getTrending(): Promise<any[]> {
  //   const trendingTerms = ['Joe Rogan', 'true crime', 'history', 'news', 'interviews'];
  //   const randomTerm = trendingTerms[Math.floor(Math.random() * trendingTerms.length)];

  //   const url = 'https://itunes.apple.com/search';
  //   const response = await this.http.axiosRef.get(url, {
  //     params: {
  //       term: randomTerm,
  //       media: 'podcast',
  //       entity: 'podcastEpisode',
  //       limit: 20,
  //     },
  //   });

  //   console.log('Trending response:', response.data);

  //   // Filter playable episodes
  //   const episodes = response.data.results.filter((ep: any) => ep.previewUrl).map((ep: any) => ({
  //     trackId: ep.trackId,
  //     trackName: ep.trackName,
  //     artistName: ep.artistName,
  //     previewUrl: ep.previewUrl,
  //     releaseDate: ep.releaseDate,
  //     artworkUrl600: ep.artworkUrl600,
  //     collectionName: ep.collectionName,
  //   }));

  //   return episodes;
  // }

  async getTrendingByGenre(genre: string): Promise<any[]> {
    const url = 'https://itunes.apple.com/search';
    const response = await this.http.axiosRef.get(url, {
      params: {
        term: genre,
        entity: 'podcast',
        limit: 20
      }
    });
  
    return response.data.results;
  }
  
}

