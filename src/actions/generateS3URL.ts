'use server';

import crypto from 'crypto';
import { Bucket } from 'sst/node/bucket';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const generateS3URL = async () => {
  const command = new PutObjectCommand({
    ACL: 'public-read',
    Key: crypto.randomUUID(),
    Bucket: Bucket.public.bucketName,
  });

  const url = await getSignedUrl(new S3Client({}), command);

  return url;
};
