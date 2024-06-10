import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Res,
  StreamableFile,
  UseInterceptors,
} from '@nestjs/common';
import { CustomUploadFile } from 'src/utils/decorator';
import { CustomFileInterceptor } from 'src/utils/interceptor';
import { ChaptersService } from './chapters.service';
import { CreateChapterDto } from './dtos/createDTO';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('chapters')
export class ChaptersController {
  constructor(private readonly chaptersService: ChaptersService) {}

  @Get()
  findAll() {
    return {
      data: {
        test: 'Đây là get test',
      },
    };
  }

  @Post('create')
  async create(@Body() createCategoryDto: CreateChapterDto) {
    return await this.chaptersService.create(createCategoryDto);
  }

  @Get(':id')
  async detail(@Param('id') id: string) {
    return await this.chaptersService.detail({ _id: id });
  }

  @Post('upload')
  @UseInterceptors(CustomFileInterceptor())
  uploadFile(
    @CustomUploadFile()
    file: Express.Multer.File,
  ) {
    console.log(file);
    return {
      message: 'oke',
    };
  }

  @Post('download/v1')
  @Header('Content-Type', 'application/json')
  @Header('Content-Disposition', 'attachment; filename="testV1.xlsx"')
  downloadFileV1(): StreamableFile {
    console.log(join(process.cwd(), './upload/1718030299930_6551cdc6209e72001daa6760.xlsx-1718030630544-632739122.xlsx'));
    const file = createReadStream(join(process.cwd(), './upload/1718030299930_6551cdc6209e72001daa6760.xlsx-1718030630544-632739122.xlsx'));
    return new StreamableFile(file);
  }

  @Post('download/v2')
  downloadFileV2(@Res({ passthrough: true }) res: Response): StreamableFile {
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="testV2.json"',
    });
    const file = createReadStream(join(process.cwd(), './upload/1718030299930_6551cdc6209e72001daa6760.xlsx-1718030630544-632739122.xlsx'));
    return new StreamableFile(file);
  }
}
