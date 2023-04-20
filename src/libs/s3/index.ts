import { S3Client } from '@aws-sdk/client-s3';
import env from '../../env';

const s3Client = new S3Client({
    endpoint: env.s3.endpoint,
    forcePathStyle: false,
    region: 'us-east-1',
    credentials: {
        accessKeyId: env.s3.accessKeyId,
        secretAccessKey: env.s3.secretAccessKey,
    },
});

export default s3Client;
