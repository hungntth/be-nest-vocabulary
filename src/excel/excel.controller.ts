import { Controller, Get, Post, Res, UseInterceptors } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { Response } from 'express';
import { CustomFileInterceptor } from 'src/utils/interceptor';
import { CustomUploadFile } from 'src/utils/decorator';

@Controller('excel')
export class ExcelController {
  constructor(private readonly excelService: ExcelService) {}

  @Get('download')
  async downloadExcel(@Res() res: Response) {
    await this.excelService.generateExcel(res);
  }

  @Post('upload')
  @UseInterceptors(CustomFileInterceptor())
  async uploadExcel(
    @CustomUploadFile()
    file: Express.Multer.File,
  ) {
    return await this.excelService.readFile(file);
  }
}
