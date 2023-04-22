import { type Request, type Response } from 'express';
import response from '../../../../libs/response';
import { type Admin_VerifySignInOtp_RequestType } from '../../../requests/admin/auth.request';
import cleanAdminData from '../../../response/adminData.response';
import { type AdminDataType } from '../../../schemas/admin.schema';
import {
    AdminFindOne,
    AdminUpdateOneById,
} from '../../../service/admin.service';
import { signJWT } from '../../../utils/manageJWT';
import { verifyOTP } from '../../../utils/otp';
import { USER_TYPES } from '../../../utils/types';

/**
 * Verify OTP for admin sign in.
 * @url     /admin/auth/verify-signin-otp
 * @access  Public
 * @method  POST
 */
const AdminVerifySignInOtpController = async (
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> => {
    try {
        const {
            body: { email, otp },
        }: Admin_VerifySignInOtp_RequestType = req.body.parsedData;

        const admin = await AdminFindOne({
            args: {
                email,
            },
        });

        verifyOTP({
            inputOTP: otp,
            savedOTP: admin.loginOtp,
            sentAt: admin.loginOtpSentAt,
        });
        const updatedAdmin: AdminDataType = await AdminUpdateOneById({
            id: admin.id,
            args: {
                $set: {
                    loginOtp: null,
                    loginOtpSentAt: null,
                },
            },
        });

        const jwtPayload = {
            email: admin.email,
            id: admin.id,
            type: USER_TYPES.ADMIN,
        };
        const token = signJWT(jwtPayload);

        req.body.io.emit('new-user', {
            content: 'New user signed in...',
        });

        return response(req, res, {
            message: 'Admin signed in successfully.',
            token,
            admin: cleanAdminData(updatedAdmin),
        });
    } catch (error) {
        return response(req, res, null, error);
    }
};

export default AdminVerifySignInOtpController;
