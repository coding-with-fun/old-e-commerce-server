import {
    PutObjectCommand,
    type PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import s3Client from '.';
import env from '../../env';

const getSignedUrl = async (
    filePath: string,
    file: Buffer,
    contentType: string
): Promise<{
    url: string;
    fileName: string;
}> => {
    const params: PutObjectCommandInput = {
        Bucket: env.s3.bucket,
        Key: filePath,
        Body: file,
        ACL: 'public-read',
        ContentType: contentType,
    };

    await s3Client.send(new PutObjectCommand(params));
    const url = `${env.s3.endpoint}/${env.s3.bucket}/${filePath}`;
    return {
        url,
        fileName: filePath,
    };
};

export default getSignedUrl;
