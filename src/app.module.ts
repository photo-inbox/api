import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Env, SCHEMA } from './shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { RouterModule, Routes } from '@nestjs/core';
import { I18nEntity, ItemEntity } from '../db';
import { I18nModule } from './i18n/i18n.module';
import { AppRoute } from './app.route';

const routes: Routes = [
  { path: AppRoute.items, module: ItemsModule },
  { path: AppRoute.i18n, module: I18nModule },
];

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: SCHEMA,
    }),
    RouterModule.register(routes),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService<Env>) => ({
        type: 'postgres',
        host: config.get('TYPEORM_HOST'),
        port: config.get('TYPEORM_PORT'),
        username: config.get('TYPEORM_USERNAME'),
        password: config.get('TYPEORM_PASSWORD'),
        database: config.get('TYPEORM_DATABASE'),
        entities: [I18nEntity, ItemEntity],
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    ItemsModule,
    I18nModule,
  ],
})
export class AppModule {}
