import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { I18nEntity } from '../../db';
import { Repository } from 'typeorm';
import { I18nDto } from '@photo-inbox/dtos';

@Injectable()
export class I18nService {
  constructor(
    @InjectRepository(I18nEntity)
    private readonly repository: Repository<I18nEntity>,
  ) {}

  async getI18nDocumentByLang(lang: string): Promise<I18nDto> {
    const dbo = await this.repository.findOneOrFail({ where: { lang } });

    return I18nService.dboToDto(dbo);
  }

  static dboToDto(dbo: I18nEntity): I18nDto {
    return {
      document: dbo.document,
      lang: dbo.lang,
    };
  }
}
