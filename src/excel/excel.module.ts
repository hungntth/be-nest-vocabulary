import { Module } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { ExcelController } from './excel.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './upload',
      }),
    }),
  ],
  controllers: [ExcelController],
  providers: [ExcelService],
})
export class ExcelModule {}
