import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Env } from '../shared';
import { I18nEntity, ItemEntity } from '../../db';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TypeormOptionsFactoryService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService<Env>) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get('TYPEORM_HOST'),
      port: this.config.get('TYPEORM_PORT'),
      username: this.config.get('TYPEORM_USERNAME'),
      password: this.config.get('TYPEORM_PASSWORD'),
      database: this.config.get('TYPEORM_DATABASE'),
      entities: [I18nEntity, ItemEntity],
    };
  }
}
