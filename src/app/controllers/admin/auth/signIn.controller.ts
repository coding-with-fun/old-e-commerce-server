import { type Request, type Response } from 'express';
import response from '../../../../libs/response';
import {
    AdminFindOne,
    AdminUpdateOneById,
} from '../../../service/admin.service';
import { comparePassword } from '../../../utils/managePassword';
import { generateOTP } from '../../../utils/otp';
import { type Admin_SignIn_RequestType } from '../../../requests/admin/auth.request';

/**
 * Sign in for admin.
 * @url     /admin/auth/signin
 * @access  Public
 * @method  POST
 */
const AdminSignInController = async (
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> => {
    try {
        const {
            body: { email, password },
        }: Admin_SignIn_RequestType = req.body.parsedData;

        const admin = await AdminFindOne({
            args: {
                email,
            },
        });

        const doesPasswordMatch = await comparePassword(
            password,
            admin.password
        );
        if (!doesPasswordMatch) {
            throw new Error('Your password does not match.');
        }

        const otp = generateOTP();
        await AdminUpdateOneById({
            id: admin.id,
            args: {
                $set: {
                    loginOtp: otp,
                    loginOtpSentAt: new Date(),
                },
            },
        });

        return response(req, res, {
            message: 'OTP has been sent to your contact number.',
        });
    } catch (error) {
        return response(req, res, null, error);
    }
};

export default AdminSignInController;
