import {
    type NextFunction,
    type Request,
    type Response,
    type Express,
} from 'express';
import _ from 'lodash';
import multer from 'multer';
import env from '../../env';
import { getRandomString, validFileTypes } from '../utils';
import { STORAGE_PATH } from '../utils/constants';
import { type UPLOAD_TYPES } from '../utils/types';

const UploadMultipleFiles =
    (type: UPLOAD_TYPES) =>
    async (req: Request, res: Response, next: NextFunction) => {
        configuredMulter(type).array('filesToUpload')(req, res, (error) => {
            if (error != null) {
                return res.json({
                    success: false,
                    message: _.get(
                        error,
                        'message',
                        'Something went wrong while uploading asset.'
                    ),
                });
            }

            next();
        });
    };

export default UploadMultipleFiles;

const configuredMulter = (type: UPLOAD_TYPES): multer.Multer => {
    return multer({
        storage: storageManager,
        limits: {
            fileSize: 1024 * 1024 * env.s3.maxFileSize,
        },
        fileFilter: function (req, file, cb) {
            const availableTypes = validFileTypes(type);

            if (!availableTypes.includes(file.mimetype)) {
                cb(
                    new Error(
                        `Invalid file type. Please upload any of these types: '${
                            availableTypes.join("', '").slice(0, -1) + "'."
                        }`
                    )
                );
            }
            cb(null, true);
        },
    });
};

const storageManager = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, STORAGE_PATH);
    },
    filename(req, file: Express.Multer.File, cb) {
        const { originalname } = file;
        const uniqueSuffix = getRandomString();
        const fileExtension = (originalname.match(/\.+[\S]+$/) ?? [])[0];

        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        cb(null, `${uniqueSuffix}${fileExtension}`);
    },
});
