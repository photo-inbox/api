import { Injectable, Logger } from '@nestjs/common';
import {
  FsService,
  GetObjectReadStreamParams,
  HeadObjectParams,
  ItemEntity,
  UploadParams,
} from '../shared';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemDto } from '@photo-inbox/dtos';
import { ItemImageModel } from './items.models';

@Injectable()
export class ItemsService {
  private readonly logger = new Logger(ItemsService.name);
  private readonly bucket = 'photo-inbox';

  constructor(
    private readonly fs: FsService,
    @InjectRepository(ItemEntity)
    private readonly repository: Repository<ItemEntity>,
  ) {}

  async getAll(): Promise<ItemDto[]> {
    const dbos = await this.repository.find();

    return dbos.map(ItemsService.dboToDto);
  }

  async getById(id: string): Promise<ItemDto> {
    const dbo = await this.repository.findOneOrFail({ where: { id } });

    return ItemsService.dboToDto(dbo);
  }

  async create(file: Express.Multer.File): Promise<ItemDto> {
    const params: UploadParams = {
      Bucket: this.bucket,
      Key: file.originalname,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.fs.upload(params);

    const dbo = await this.repository.save(
      this.repository.create({ image: file.originalname }),
    );

    return ItemsService.dboToDto(dbo);
  }

  async getImage(id: string): Promise<ItemImageModel> {
    this.logger.debug(`getImage, ${id}`);

    const dbo = await this.repository.findOneOrFail({ where: { id } });

    const params: HeadObjectParams & GetObjectReadStreamParams = {
      Bucket: this.bucket,
      Key: dbo.image,
    };

    return {
      data: await this.fs.headObject(params),
      stream: this.fs.getObjectReadStream(params),
      filename: dbo.image,
    };
  }

  static dboToDto(dbo: ItemEntity): ItemDto {
    return {
      id: dbo.id,
      imageUrl: `api/items/${dbo.id}/image`,
    };
  }
}
