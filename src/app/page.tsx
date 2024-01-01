import crypto from 'crypto';
import { Bucket } from 'sst/node/bucket';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const bucketURL = async () => {
  'use server';

  const command = new PutObjectCommand({
    ACL: 'public-read',
    Key: crypto.randomUUID(),
    Bucket: Bucket.public.bucketName,
  });

  const url = await getSignedUrl(new S3Client({}), command);

  return url;
};

const onSubmit = async (e: FormData) => {
  'use server';

  const url = await bucketURL();

  const file = e.get('file');
  if (!file) {
    return;
  }

  // pull the `type` out of the file object
  const fileType = (file as any).type;
  const response = await fetch(url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': fileType,
    },
  });

  console.log('Response', response);
  console.log('Uploaded image');
};

const Home = async () => {
  return (
    <main className='flex flex-col items-center justify-center w-full h-screen'>
      <form action={onSubmit}>
        <input name='file' type='file' accept='image/png, image/jpeg' />
        <button type='submit'>Upload</button>
      </form>
    </main>
  );
};

export default Home;
