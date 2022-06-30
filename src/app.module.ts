import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Env, SCHEMA } from './shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { RouterModule } from '@nestjs/core';
import { ItemEntity } from '../db';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: SCHEMA,
    }),
    RouterModule.register([{ path: 'items', module: ItemsModule }]),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService<Env>) => ({
        type: 'postgres',
        host: config.get('TYPEORM_HOST'),
        port: config.get('TYPEORM_PORT'),
        username: config.get('TYPEORM_USERNAME'),
        password: config.get('TYPEORM_PASSWORD'),
        database: config.get('TYPEORM_DATABASE'),
        entities: [ItemEntity],
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    ItemsModule,
  ],
})
export class AppModule {}
