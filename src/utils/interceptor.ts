import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export function CustomFileInterceptor() {
  return FileInterceptor('file', {
    storage: diskStorage({
      destination: './upload',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        const filename = `${file.originalname}-${uniqueSuffix}${ext}`;
        callback(null, filename);
      },
    }),
  });
}
