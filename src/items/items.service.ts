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
import { ItemDto } from '@photo-inbox/dtos';

@Injectable()
export class ItemsService {
  private readonly logger = new Logger(ItemsService.name);
  private readonly bucket = 'photo-inbox';

  constructor(
    private readonly fileStorage: FileStorageService,
    @InjectRepository(ItemEntity)
    private readonly repository: Repository<ItemEntity>,
  ) {}

  async getAll(): Promise<ItemDto[]> {
    const dbos = await this.repository.find();

    return dbos.map(this.dboToDto);
  }

  async getById(id: string): Promise<ItemDto> {
    const dbo = await this.repository.findOneOrFail({ where: { id } });

    return this.dboToDto(dbo);
  }

  async create(file: Express.Multer.File): Promise<ItemDto> {
    const params: UploadParams = {
      Bucket: this.bucket,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.fileStorage.upload(params);

    const dbo = await this.repository.save(
      this.repository.create({ image: file.originalname }),
    );

    return this.dboToDto(dbo);
  }

  async getImage(
    id: string,
  ): Promise<[HeadObjectResponse, stream.Readable, string]> {
    this.logger.debug(`getImage, ${id}`);

    const dbo = await this.repository.findOneOrFail({ where: { id } });

    const params: HeadObjectParams & GetObjectReadStreamParams = {
      Bucket: this.bucket,
      Key: dbo.image,
    };

    return [
      await this.fileStorage.headObject(params),
      this.fileStorage.getObjectReadStream(params),
      dbo.image,
    ];
  }

  private dboToDto(dbo: ItemEntity): ItemDto {
    return {
      id: dbo.id,
      imageUrl: `api/items/${dbo.id}/image`,
    };
  }
}
