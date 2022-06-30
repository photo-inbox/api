import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { FsModule } from '../shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from '../../db';

@Module({
  imports: [FsModule, TypeOrmModule.forFeature([ItemEntity])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
