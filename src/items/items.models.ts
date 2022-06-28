import { HeadObjectResponse } from '../shared';
import stream from 'stream';

export interface ItemImageModel {
  data: HeadObjectResponse;
  stream: stream.Readable;
  filename: string;
}
