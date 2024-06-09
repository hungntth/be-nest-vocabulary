import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chapter, ChapterSchema } from './schemas/chapter.schema';
import { ChaptersController } from './chapters.controller';
import { ChaptersService } from './chapters.service';
import { ChaptersRepository } from './chapters.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chapter.name, schema: ChapterSchema }]),
  ],
  controllers: [ChaptersController],
  providers: [ChaptersService, ChaptersRepository],
})
export class ChaptersModule {}
