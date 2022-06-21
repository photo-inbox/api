import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileStorageModule, SCHEMA } from './shared';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: SCHEMA,
    }),
    FileStorageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
