import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SCHEMA } from './shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './items/items.module';
import { RouterModule, Routes } from '@nestjs/core';
import { AppRoute } from './app.route';
import { TypeormOptionsFactoryService } from './core';

const routes: Routes = [{ path: AppRoute.items, module: ItemsModule }];

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: SCHEMA,
    }),
    RouterModule.register(routes),
    TypeOrmModule.forRootAsync({
      // TODO use here DataSource from db directory
      useClass: TypeormOptionsFactoryService,
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    ItemsModule,
  ],
})
export class AppModule {}
