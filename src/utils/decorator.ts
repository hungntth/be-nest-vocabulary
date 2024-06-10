import { HttpStatus, ParseFilePipeBuilder, UploadedFile } from '@nestjs/common';

export function CustomUploadFile() {
  const parseFilePipe = new ParseFilePipeBuilder()
    .addFileTypeValidator({
      fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    //   fileType: 'image/jpeg',
    })
    .addMaxSizeValidator({ maxSize: 1000 * 1000 })
    .build({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    });

  return UploadedFile(parseFilePipe);
}
