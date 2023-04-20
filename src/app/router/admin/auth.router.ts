import { Router } from 'express';
import AdminForgotPasswordController from '../../controllers/admin/auth/forgotPassword.controller';
import AdminSignInController from '../../controllers/admin/auth/signIn.controller';
import AdminVerifySignInOtpController from '../../controllers/admin/auth/verifySignInOtp.controller';
import requestValidator from '../../middlewares/requestValidator';
import {
    AdminForgotPasswordRequest,
    AdminSignInRequest,
    AdminVerifySignInOtpRequest,
} from '../../requests/admin/auth.request';

const AuthRouter = Router();

AuthRouter.post(
    '/signin',
    requestValidator(AdminSignInRequest),
    AdminSignInController
);

AuthRouter.post(
    '/verify-signin-otp',
    requestValidator(AdminVerifySignInOtpRequest),
    AdminVerifySignInOtpController
);

AuthRouter.post(
    '/forgot-password',
    requestValidator(AdminForgotPasswordRequest),
    AdminForgotPasswordController
);

export default AuthRouter;
