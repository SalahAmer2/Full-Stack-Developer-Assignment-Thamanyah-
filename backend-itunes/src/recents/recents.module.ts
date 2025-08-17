import { Module } from '@nestjs/common';
import { RecentsService } from './recents.service';
import { RecentsController } from './recents.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [RecentsController],
  providers: [RecentsService, PrismaService],
})
export class RecentsModule {}