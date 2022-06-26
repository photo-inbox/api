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
import { ItemEntity } from '../../db';

@Controller()
export class ItemsController {
  private readonly logger = new Logger(ItemsController.name);

  constructor(private readonly service: ItemsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile()
    file: Express.Multer.File,
  ): Promise<ItemEntity> {
    return this.service.create(file);
  }

  @Get('image/:filename')
  async getImage(
    @Res({ passthrough: true }) res: Response,
    @Param('filename') filename: string,
  ): Promise<StreamableFile> {
    this.logger.debug(`getImage, ${filename}`);

    const [data, stream] = await this.service.getImage(filename);

    res.set({
      'Content-Type': data.ContentType,
      'Content-Disposition': `attachment; filename="${filename}"`,
    });

    return new StreamableFile(stream);
  }
}
