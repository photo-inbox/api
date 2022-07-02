import { Injectable, Logger } from '@nestjs/common';
import {
  FsService,
  GetObjectReadStreamParams,
  HeadObjectParams,
  UploadParams,
} from '../shared';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemDto } from '@photo-inbox/dtos';
import { CreateItemModel, ItemImageModel } from './items.models';
import { ItemEntity } from '../../db';

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

  async create({ image, ...other }: CreateItemModel): Promise<ItemDto> {
    const params: UploadParams = {
      Bucket: this.bucket,
      Key: image.originalname,
      Body: image.buffer,
      ContentType: image.mimetype,
    };

    await this.fs.upload(params);

    const dbo = await this.repository.save(
      this.repository.create({ image: image.originalname, ...other }),
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
      isCompleted: dbo.isCompleted,
      created: dbo.created,
    };
  }

  // TODO make it sorted by most used labels
  async autocompleteLabel(search?: string): Promise<string[]> {
    this.logger.debug(`autocompleteLabel ${search}`);

    const builder = (() => {
      const basic = this.repository
        .createQueryBuilder('item')
        .select(['item.label'])
        .distinctOn(['label']);

      if (!search) {
        return basic;
      }

      return basic.where(`label ILIKE :search`, { search: `%${search}%` });
    })();

    return (await builder.getMany()).map((i) => i.label);
  }
}
