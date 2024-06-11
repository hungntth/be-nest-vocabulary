import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateVocabularyDto } from './dtos/createDTO';
import { Vocabulary } from './schemas/vocabulary.schema';
import { createMp3File } from 'src/utils';

@Injectable()
export class VocabulariesService {
  constructor(
    @InjectModel(Vocabulary.name) private chapterModel: Model<Vocabulary>,
  ) {}

  async create(createVocabularyDto: CreateVocabularyDto): Promise<Vocabulary> {
    const checkVocabulary = await this.chapterModel.findOne({
      name: createVocabularyDto.name,
      chapterId: createVocabularyDto.chapterId,
    });
    if (checkVocabulary) return checkVocabulary;
    const createdVocabulary = new this.chapterModel(createVocabularyDto);
    await createMp3File({
      vocabulary: createVocabularyDto.name,
    });
    return createdVocabulary.save();
  }

  async findAll(): Promise<Vocabulary[]> {
    return this.chapterModel.find().exec();
  }
}
