import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chapter } from './schemas/chapter.schema';
import { CreateChapterDto } from './dtos/createDTO';
import { ChaptersRepository } from './chapters.repository';
import { ExcelService } from 'src/excel/excel.service';
import { VocabulariesService } from 'src/vocabulary/vocabularies.service';

@Injectable()
export class ChaptersService {
  constructor(
    @InjectModel(Chapter.name) private chapterModel: Model<Chapter>,
    private readonly chaptersRepo: ChaptersRepository,
    private readonly excelService: ExcelService,
    private readonly vocabulariesService: VocabulariesService,
  ) {}

  async get(): Promise<Chapter[]> {
    const chapters = this.chapterModel.find({});
    return chapters;
  }

  async create(createChapterDto: CreateChapterDto): Promise<Chapter> {
    const checkChapter = await this.chaptersRepo.findByTitle({
      title: createChapterDto.title,
    });
    if (!checkChapter) return checkChapter;
    return await this.chaptersRepo.create(createChapterDto);
  }

  async findAll(): Promise<Chapter[]> {
    return this.chapterModel.find().exec();
  }

  async detail({ _id }: { _id: string }): Promise<Chapter> {
    return this.chaptersRepo.detail({ _id });
  }

  async importExcel(chapterNo: number, file: Express.Multer.File) {
    const datas = await this.excelService.readFile(file);
    const chapter = await this.chapterModel.findOne({ chapterNo });
    if (!chapter) throw new BadRequestException('Làm gì có chapter này bro...');

    if (datas?.length > 1) {
      for (const data of datas) {
        if (
          typeof data[0] === 'number' &&
          !isNaN(data[0]) &&
          data[1] &&
          data[2]
        ) {
          await this.vocabulariesService.create({
            chapterId: chapter._id,
            name: data[1],
            meaning: data[2],
          });
        }
      }
    }
  }
}
