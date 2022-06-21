import { Injectable } from '@nestjs/common';
import stream from 'stream';
import {
  FileStorageService,
  GetObjectReadStreamParams,
  HeadObjectParams,
  HeadObjectResponse,
  UploadParams,
  UploadResponse,
} from './shared';

@Injectable()
export class AppService {
  private readonly bucket = 'photo-inbox';

  constructor(private readonly fileStorage: FileStorageService) {}

  async uploadFile(file: Express.Multer.File): Promise<UploadResponse> {
    const params: UploadParams = {
      Bucket: this.bucket,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    return await this.fileStorage.upload(params);
  }

  async downloadFile(
    filename: string,
  ): Promise<[HeadObjectResponse, stream.Readable]> {
    const params: HeadObjectParams & GetObjectReadStreamParams = {
      Bucket: this.bucket,
      Key: filename,
    };

    return [
      await this.fileStorage.headObject(params),
      this.fileStorage.getObjectReadStream(params),
    ];
  }
}
