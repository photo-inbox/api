import { Module } from '@nestjs/common';
import { FsService } from './fs.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [FsService],
  exports: [FsService],
})
export class FsModule {}
