import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateChapterDto } from './dtos/createDTO';
import { ChaptersService } from './chapters.service';

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
}
