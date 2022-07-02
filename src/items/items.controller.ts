import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Query,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { ItemsService } from './items.service';
import { CreateItemDto, ItemDto } from '@photo-inbox/dtos';

@Controller()
export class ItemsController {
  private readonly logger = new Logger(ItemsController.name);

  constructor(private readonly service: ItemsService) {}

  @Get()
  async getAll(): Promise<ItemDto[]> {
    return await this.service.getAll();
  }

  @Get('label')
  async autocompleteLabel(@Query('search') search?: string): Promise<string[]> {
    return await this.service.autocompleteLabel(search);
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ItemDto> {
    return await this.service.getById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile()
    image: Express.Multer.File,
    @Body() body: Omit<CreateItemDto, 'image'>,
  ): Promise<ItemDto> {
    return await this.service.create({ image, ...body });
  }

  @Get(':id/image')
  async getImage(
    @Res({ passthrough: true }) res: Response,
    @Param('id') id: string,
  ): Promise<StreamableFile> {
    this.logger.debug(`getImage, ${id}`);

    const { data, stream, filename } = await this.service.getImage(id);

    res.set({
      'Content-Type': data.ContentType,
      'Content-Disposition': `attachment; filename="${filename}"`,
    });

    return new StreamableFile(stream);
  }
}
