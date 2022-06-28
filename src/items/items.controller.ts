import {
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ItemsService } from './items.service';
import { ItemDto } from '@photo-inbox/dtos';

@Controller()
export class ItemsController {
  private readonly logger = new Logger(ItemsController.name);

  constructor(private readonly service: ItemsService) {}

  @Get()
  async getAll(): Promise<ItemDto[]> {
    return await this.service.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ItemDto> {
    return await this.service.getById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile()
    file: Express.Multer.File,
  ): Promise<ItemDto> {
    return await this.service.create(file);
  }

  @Get(':id/image')
  async getImage(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
  ): Promise<StreamableFile> {
    this.logger.debug(`getImage, ${id}`);

    const [data, stream, filename] = await this.service.getImage(id);

    res.set({
      'Content-Type': data.ContentType,
      'Content-Disposition': `attachment; filename="${filename}"`,
    });

    return new StreamableFile(stream);
  }
}
