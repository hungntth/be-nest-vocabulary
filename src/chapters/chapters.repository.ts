import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Chapter } from './schemas/chapter.schema';

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
}
