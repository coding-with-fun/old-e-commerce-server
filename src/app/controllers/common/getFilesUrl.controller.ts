import { type Request, type Response, type Express } from 'express';
import fs from 'fs';
import response from '../../../libs/response';
import getSignedUrl from '../../../libs/s3/getSignedUrl';
import TempFile, { type TempFileDataType } from '../../schemas/tempFile.schema';

/**
 * Get URL for uploaded files.
 * @url     /get-files-url
 * @access  Private
 * @method  POST
 */
const GetFilesUrlController = async (
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> => {
    let tempFiles: Express.Multer.File[] = [];

    try {
        if (
            req.files == null ||
            req.files === undefined ||
            req.files.length === 0
        ) {
            throw new Error('Please select at least one file.');
        }
        if (!Array.isArray(req.files)) {
            throw new Error('Error while uploading files.');
        }

        const files = req.files;
        tempFiles = files;

        const filesData = await Promise.allSettled(
            files.map(async (file) => {
                const source = fs.readFileSync(file.path);
                const data = await getSignedUrl(
                    file.filename,
                    source,
                    file.mimetype
                );

                const newFile = await TempFile.create({
                    ...data,
                });
                await newFile.save();

                return newFile;
            })
        );

        const responseData: {
            urls: TempFileDataType[];
            message: string;
            success: boolean;
        } = {
            urls: [],
            message: 'Files uploaded successfully.',
            success: true,
        };
        for (const fileData of filesData) {
            if (fileData.status === 'rejected') {
                res.status(400);
                responseData.message = 'Error while uploading some files.';
                responseData.success = false;
            } else {
                responseData.urls.push(fileData.value);
            }
        }

        return response(req, res, responseData);
    } catch (error) {
        return response(req, res, null, error);
    } finally {
        tempFiles.map((file) => {
            fs.unlinkSync(file.path);
            return 1;
        });
    }
};

export default GetFilesUrlController;
