import { type Request, type Response } from 'express';
import env from '../../../../env';
import sendMailer, {
    type SendMailerPropTypes,
} from '../../../../libs/mail/sendMailer';
import response from '../../../../libs/response';
import { type Admin_UpdateEmailRequest_RequestType } from '../../../requests/admin/profile.request';
import { type AdminDataType } from '../../../schemas/admin.schema';
import { AdminUpdateOneById } from '../../../service/admin.service';
import { ADMIN_PANEL_ENDPOINTS } from '../../../utils/constants';
import { signJWT } from '../../../utils/manageJWT';
import { USER_TYPES } from '../../../utils/types';

/**
 * Update admin's email address.
 * @url     /admin/profile/update/email
 * @access  Private
 * @method  POST
 */
const AdminUpdateEmailController = async (
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> => {
    try {
        const admin: AdminDataType = req.body.user;
        const {
            body: { email },
        }: Admin_UpdateEmailRequest_RequestType = req.body.parsedData;

        const emailVerificationToken = signJWT(
            {
                type: USER_TYPES.ADMIN,
                id: admin.id,
                email,
            },
            '1h'
        );
        await AdminUpdateOneById(admin.id, {
            $set: {
                emailVerificationToken,
                newEmail: email,
            },
        });

        const emailData: SendMailerPropTypes = {
            subject: 'Verify email',
            toAddress: admin.email,
            context: {
                emailVerificationLink: `${env.app.admin_panel_url}/${ADMIN_PANEL_ENDPOINTS['verify-email']}?token=${emailVerificationToken}`,
            },
            template: 'verifyEmail',
        };
        void sendMailer(emailData);

        return response(req, res, {
            message:
                'A verification mail has been sent to your new email address.',
        });
    } catch (error) {
        return response(req, res, null, error);
    }
};

export default AdminUpdateEmailController;
