import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chapter } from './schemas/chapter.schema';
import { CreateChapterDto } from './dtos/createDTO';
import { ChaptersRepository } from './chapters.repository';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectModel(Chapter.name) private chapterModel: Model<Chapter>,
    private readonly chaptersRepo: ChaptersRepository,
  ) {}

  async create(createChapterDto: CreateChapterDto): Promise<Chapter> {
    const createdChapter = new this.chapterModel(createChapterDto);
    return createdChapter.save();
  }

  async findAll(): Promise<Chapter[]> {
    return this.chapterModel.find().exec();
  }

  async detail({ _id }: { _id: string }): Promise<any> {
    return this.chaptersRepo.detail({ _id });
  }
}
