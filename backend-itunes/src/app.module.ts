import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, AuthModule, ConfigModule.forRoot({isGlobal:true})],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
