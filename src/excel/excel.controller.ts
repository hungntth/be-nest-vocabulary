import { Controller, Get, Res } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { Response } from 'express';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Get('download')
  async downloadExcel(@Res() res: Response) {
    await this.excelService.generateExcel(res);
  }
}
