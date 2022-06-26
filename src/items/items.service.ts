import { Injectable, Logger } from '@nestjs/common';
import {
  FileStorageService,
  GetObjectReadStreamParams,
  HeadObjectParams,
  HeadObjectResponse,
  UploadParams,
} from '../shared';
import stream from 'stream';
import { Repository } from 'typeorm';
import { ItemEntity } from '../../db';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ItemsService {
  private readonly logger = new Logger(ItemsService.name);
  private readonly bucket = 'photo-inbox';

  constructor(
    private readonly fileStorage: FileStorageService,
    @InjectRepository(ItemEntity)
    private readonly repository: Repository<ItemEntity>,
  ) {}

  async create(file: Express.Multer.File): Promise<ItemEntity> {
    const params: UploadParams = {
      Bucket: this.bucket,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.fileStorage.upload(params);

    return this.repository.save(
      this.repository.create({ image: file.originalname }),
    );
  }

  async getImage(
    filename: string,
  ): Promise<[HeadObjectResponse, stream.Readable]> {
    this.logger.debug(`getImage, ${filename}`);

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
