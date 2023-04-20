import { type Request, type Response } from 'express';
import env from '../../../../env';
import sendMailer, {
    type SendMailerPropTypes,
} from '../../../../libs/mail/sendMailer';
import response from '../../../../libs/response';
import { type Admin_ForgotPassword_RequestType } from '../../../requests/admin/auth.request';
import {
    AdminFindOne,
    AdminUpdateOneById,
} from '../../../service/admin.service';
import { ADMIN_PANEL_ENDPOINTS } from '../../../utils/constants';
import { signJWT } from '../../../utils/manageJWT';
import { USER_TYPES } from '../../../utils/types';

/**
 * Send email for admin forgot password.
 * @url     /admin/auth/forgot-password
 * @access  Public
 * @method  POST
 */
const AdminForgotPasswordController = async (
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> => {
    try {
        const {
            body: { email },
        }: Admin_ForgotPassword_RequestType = req.body.parsedData;

        const admin = await AdminFindOne({
            email,
        });

        const passwordVerificationToken = signJWT(
            {
                type: USER_TYPES.ADMIN,
                id: admin.id,
            },
            '1h'
        );
        await AdminUpdateOneById(admin.id, {
            $set: {
                passwordVerificationToken,
            },
        });

        const emailData: SendMailerPropTypes = {
            subject: 'Reset password',
            toAddress: admin.email,
            context: {
                forgotPasswordLink: `${env.app.admin_panel_url}/${ADMIN_PANEL_ENDPOINTS['reset-password']}?token=${passwordVerificationToken}`,
            },
            template: 'forgotPassword',
        };
        void sendMailer(emailData);

        return response(req, res, {
            message: '',
        });
    } catch (error) {
        return response(req, res, null, error);
    }
};

export default AdminForgotPasswordController;
