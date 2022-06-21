import { S3 } from 'aws-sdk';

export type UploadParams = S3.Types.PutObjectRequest;
export type UploadResponse = S3.Types.ManagedUpload.SendData;

export type GetObjectReadStreamParams = S3.Types.GetObjectRequest;

export type HeadObjectParams = S3.Types.HeadObjectRequest;
export type HeadObjectResponse = S3.Types.HeadObjectOutput;
