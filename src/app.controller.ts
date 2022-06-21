import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { UploadResponse } from './shared';

@Controller()
export class AppController {
  constructor(private readonly app: AppService) {}

  @Get(':filename')
  async downloadFile(
    @Res({ passthrough: true }) res: Response,
    @Param('filename') filename: string,
  ): Promise<StreamableFile> {
    const [data, stream] = await this.app.downloadFile(filename);

    res.set({
      'Content-Type': data.ContentType,
      'Content-Disposition': `attachment; filename="${filename}"`,
    });

    return new StreamableFile(stream);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<UploadResponse> {
    return this.app.uploadFile(file);
  }
}
