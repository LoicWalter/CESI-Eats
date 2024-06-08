import { PipeTransform, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ErrorsMessages } from 'libs/common';

@Injectable()
export class ProfileFileValidationPipe implements PipeTransform {
  transform(value: Express.Multer.File) {
    if (!value) {
      return value;
    }

    const maxFileSize = 5 * 1024 * 1024; // 5MB
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];

    if (value.size > maxFileSize) {
      throw new UnprocessableEntityException(ErrorsMessages.FILE_TOO_LARGE);
    }

    if (!allowedMimeTypes.includes(value.mimetype)) {
      throw new UnprocessableEntityException(ErrorsMessages.INVALID_FILE_TYPE);
    }
    console.log('file infos :', value);
    return value;
  }
}
