import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import stream from 'stream';
import { ConfigService } from '@nestjs/config';
import {
  GetObjectReadStreamParams,
  HeadObjectParams,
  HeadObjectResponse,
  UploadParams,
  UploadResponse,
} from './fs.models';
import { Env, NodeEnv } from '../config';

@Injectable()
export class FsService {
  private readonly logger = new Logger(FsService.name);

  private readonly s3 = new S3({
    endpoint: this.config.get('AWS_ENDPOINT'),
    accessKeyId: this.config.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: this.config.get('AWS_SECRET_ACCESS_KEY'),
    region: this.config.get('AWS_REGION'),
    s3ForcePathStyle: this.config.get('NODE_ENV') === NodeEnv.development,
  });

  constructor(private readonly config: ConfigService<Env>) {}

  upload(params: UploadParams): Promise<UploadResponse> {
    return this.s3.upload(params).promise();
  }

  getObjectReadStream(params: GetObjectReadStreamParams): stream.Readable {
    return this.s3.getObject(params).createReadStream();
  }

  headObject(params: HeadObjectParams): Promise<HeadObjectResponse> {
    return this.s3.headObject(params).promise();
  }
}
