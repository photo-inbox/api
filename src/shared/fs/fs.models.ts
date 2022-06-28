import { S3 } from 'aws-sdk';

export type UploadParams = Pick<
  S3.Types.PutObjectRequest,
  'Bucket' | 'Key' | 'Body' | 'ContentType'
>;
export type UploadResponse = Pick<S3.Types.ManagedUpload.SendData, 'Key'>;

export type GetObjectReadStreamParams = Pick<
  S3.Types.GetObjectRequest,
  'Bucket' | 'Key'
>;

export type HeadObjectParams = Pick<
  S3.Types.HeadObjectRequest,
  'Bucket' | 'Key'
>;
export type HeadObjectResponse = Pick<S3.Types.HeadObjectOutput, 'ContentType'>;
