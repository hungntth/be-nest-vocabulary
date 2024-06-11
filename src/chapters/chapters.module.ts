import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Chapter, ChapterSchema } from './schemas/chapter.schema';
import { ChaptersController } from './chapters.controller';
import { ChaptersService } from './chapters.service';
import { ChaptersRepository } from './chapters.repository';
import { MulterModule } from '@nestjs/platform-express';
import { ExcelService } from 'src/excel/excel.service';
import { VocabulariesService } from 'src/vocabulary/vocabularies.service';
import {
  Vocabulary,
  VocabularySchema,
} from 'src/vocabulary/schemas/vocabulary.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chapter.name, schema: ChapterSchema },
      { name: Vocabulary.name, schema: VocabularySchema },
    ]),
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
  ],
  controllers: [ChaptersController],
  providers: [
    ChaptersService,
    ChaptersRepository,
    ExcelService,
    VocabulariesService,
  ],
})
export class ChaptersModule {}
