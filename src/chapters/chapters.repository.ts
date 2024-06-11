import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Chapter } from './schemas/chapter.schema';
import { CreateChapterDto } from './dtos/createDTO';

@Injectable()
export class ChaptersRepository {
  constructor(
    @InjectModel(Chapter.name) private chapterModel: Model<Chapter>,
  ) {}

  async detail({ _id }: { _id: string }): Promise<any> {
    const chapter = await this.chapterModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(_id) },
      },
      {
        $lookup: {
          from: 'vocabularies',
          localField: '_id',
          foreignField: 'chapterId',
          as: 'vocabularies',
        },
      },
    ]);
    return chapter;
  }

  async create(createChapterDto: CreateChapterDto): Promise<Chapter> {
    const createdChapter = new this.chapterModel(createChapterDto);
    return createdChapter.save();
  }

  async findByTitle({ title }: { title: string }) {
    const checkChapter = await this.chapterModel.findOne({
      title: title,
    });
    return checkChapter;
  }
}
