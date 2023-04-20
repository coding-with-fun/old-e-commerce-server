import { Router } from 'express';
import requestValidator from '../middlewares/requestValidator';
import {
    ResetPasswordRequest,
    VerifyEmailRequest,
} from '../requests/common.request';
import ResetPasswordController from '../controllers/common/resetPassword.controller';
import UploadMultipleFiles from '../middlewares/parseFiles';
import { UPLOAD_TYPES } from '../utils/types';
import GetFilesUrlController from '../controllers/common/getFilesUrl.controller';
import EmailVerificationController from '../controllers/common/emailVerification.controller';

const CommonRouter = Router();

CommonRouter.post(
    '/reset-password',
    requestValidator(ResetPasswordRequest),
    ResetPasswordController
);

CommonRouter.post(
    '/verify-email',
    requestValidator(VerifyEmailRequest),
    EmailVerificationController
);

CommonRouter.post(
    '/get-files-url',
    UploadMultipleFiles(UPLOAD_TYPES.IMAGE),
    GetFilesUrlController
);

export default CommonRouter;
