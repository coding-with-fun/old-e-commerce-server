import TempFile from '../app/schemas/tempFile.schema';
import { getBeforeTime } from '../app/utils/time';
import deleteFiles from '../libs/s3/deleteFiles';

const DeleteTempFiles = async (): Promise<void> => {
    const tempFiles = await TempFile.find({
        createdAt: {
            $lt: getBeforeTime(24, 'hours'),
        },
    });

    const fileNamesToDelete: string[] = [];
    const fileIdsToDelete: string[] = [];
    for (const file of tempFiles) {
        fileNamesToDelete.push(file.fileName);
        fileIdsToDelete.push(file.id);
    }

    if (fileNamesToDelete.length > 0) {
        await deleteFiles(fileNamesToDelete);
    }

    if (fileIdsToDelete.length > 0) {
        await TempFile.deleteMany({
            _id: {
                $in: fileIdsToDelete,
            },
        });
    }
};

export default DeleteTempFiles;
