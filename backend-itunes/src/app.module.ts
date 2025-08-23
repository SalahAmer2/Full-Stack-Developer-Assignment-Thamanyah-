import { Module } from '@nestjs/common';
import { QueueModule } from './queue/queue.module';
import { FavoritesModule } from './favorites/favorites.module';
import { RecentsModule } from './recents/recents.module';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [QueueModule, FavoritesModule, RecentsModule, HttpModule, AuthModule, ConfigModule.forRoot({isGlobal:true})],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
