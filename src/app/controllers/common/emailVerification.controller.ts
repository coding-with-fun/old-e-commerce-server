import { type Request, type Response } from 'express';
import response from '../../../libs/response';
import { type VerifyEmail_RequestType } from '../../requests/common.request';
import { AdminFindById, AdminUpdateOneById } from '../../service/admin.service';
import { verifyJWT } from '../../utils/manageJWT';
import { USER_TYPES, type jwtDataType } from '../../utils/types';

/**
 * Verify email for all users.
 * @url     /verify-email
 * @access  Public
 * @method  POST
 */
const EmailVerificationController = async (
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> => {
    try {
        const {
            body: { token },
        }: VerifyEmail_RequestType = req.body.parsedData;

        // Parse JWT data
        const data: string | jwtDataType = (await verifyJWT(
            token
        )) as jwtDataType;

        if (data.type === USER_TYPES.ADMIN) {
            // Check if admin has requested the email change
            const admin = await AdminFindById(data.id);
            if (
                admin.emailVerificationToken == null ||
                admin.newEmail !== data.email
            ) {
                throw new Error('Admin not found.');
            }

            // Set new email, remove temporary email and remove the token
            await AdminUpdateOneById(data.id, {
                $set: {
                    emailVerificationToken: null,
                    email: data.email,
                    newEmail: null,
                },
            });
        } else {
            throw new Error('Invalid user type.');
        }

        return response(req, res, {
            message: 'Email updated successfully.',
        });
    } catch (error) {
        return response(req, res, null, error);
    }
};

export default EmailVerificationController;
