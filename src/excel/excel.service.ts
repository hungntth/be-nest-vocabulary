import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import { Response } from 'express';

@Injectable()
export class ExcelService {
    
  async generateExcel(res: Response) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');

    // Tạo header
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 30 },
      { header: 'Email', key: 'email', width: 30 },
    ];

    // Thêm dữ liệu mẫu
    worksheet.addRow({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });
    worksheet.addRow({ id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' });

    // Thiết lập kiểu trả về là file Excel
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');

    // Ghi dữ liệu vào response
    await workbook.xlsx.write(res);
    res.end();
  }
}
