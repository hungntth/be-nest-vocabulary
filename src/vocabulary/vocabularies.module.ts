import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Vocabulary, VocabularySchema } from './schemas/vocabulary.schema';
import { VocabulariesController } from './vocabularies.controller';
import { VocabulariesService } from './vocabularies.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vocabulary.name, schema: VocabularySchema },
    ]),
  ],
  controllers: [VocabulariesController],
  providers: [VocabulariesService],
})
export class VocabulariesModule {}
