import { Module } from '@nestjs/common';
import { I18nController } from './i18n.controller';
import { I18nService } from './i18n.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { I18nEntity } from '../../db';

@Module({
  imports: [TypeOrmModule.forFeature([I18nEntity])],
  controllers: [I18nController],
  providers: [I18nService],
})
export class I18nModule {}
