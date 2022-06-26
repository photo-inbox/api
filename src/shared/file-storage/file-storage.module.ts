import { Module } from '@nestjs/common';
import { FileStorageService } from './file-storage.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [FileStorageService],
  exports: [FileStorageService],
})
export class FileStorageModule {}
