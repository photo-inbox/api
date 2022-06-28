import { Module } from '@nestjs/common';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { FsModule, ItemEntity } from '../shared';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [FsModule, TypeOrmModule.forFeature([ItemEntity])],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
