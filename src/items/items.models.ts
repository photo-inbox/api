import { HeadObjectResponse } from '../shared';
import stream from 'stream';

export interface ItemImageModel {
  data: HeadObjectResponse;
  stream: stream.Readable;
  filename: string;
}

export interface CreateItemModel {
  image: Express.Multer.File;
  label?: string;
}
