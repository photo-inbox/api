import { Controller, Get, Param } from '@nestjs/common';
import { I18nService } from './i18n.service';
import { I18nDto } from '@photo-inbox/dtos';

@Controller()
export class I18nController {
  constructor(private readonly service: I18nService) {}

  @Get(':lang')
  async getI18nByLang(@Param('lang') lang: string): Promise<I18nDto> {
    return await this.service.getI18nDocumentByLang(lang);
  }
}
