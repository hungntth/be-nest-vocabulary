import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateVocabularyDto } from './dtos/createDTO';
import { VocabulariesService } from './vocabularies.service';

@Controller('vocabularies')
export class VocabulariesController {
  constructor(private readonly vocabulariesService: VocabulariesService) {}

  @Get()
  async findAll() {
    return await this.vocabulariesService.findAll();
  }

  @Post('create')
  async create(@Body() createCategoryDto: CreateVocabularyDto) {
    return await this.vocabulariesService.create(createCategoryDto);
  }
}
