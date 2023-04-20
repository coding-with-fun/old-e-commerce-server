import {
    DeleteObjectsCommand,
    type DeleteObjectsCommandInput,
} from '@aws-sdk/client-s3';
import s3Client from '.';
import env from '../../env';

const deleteFiles = async (fileNames: string[]): Promise<void> => {
    try {
        const params: DeleteObjectsCommandInput = {
            Bucket: env.s3.bucket,
            Delete: {
                Objects: [],
            },
        };
        if (params.Delete?.Objects != null) {
            for (const file of fileNames) {
                params.Delete.Objects.push({
                    Key: file,
                });
            }
        }

        await s3Client.send(new DeleteObjectsCommand(params));
    } catch (error) {
        console.log('Error while deleting the file.');
        console.log(error);
    }
};

export default deleteFiles;
