import { type Request, type Response } from 'express';
import response from '../../../libs/response';
import { type ResetPassword_RequestType } from '../../requests/common.request';
import { AdminFindById, AdminUpdateOneById } from '../../service/admin.service';
import { verifyJWT } from '../../utils/manageJWT';
import { encryptPassword } from '../../utils/managePassword';
import { USER_TYPES, type jwtDataType } from '../../utils/types';

/**
 * Reset password for all users.
 * @url     /reset-password
 * @access  Public
 * @method  POST
 */
const ResetPasswordController = async (
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> => {
    try {
        const {
            body: { password, token },
        }: ResetPassword_RequestType = req.body.parsedData;

        // Parse JWT data
        const data: string | jwtDataType = (await verifyJWT(
            token
        )) as jwtDataType;

        if (data.type === USER_TYPES.ADMIN) {
            // Check if admin has requested the password reset
            const admin = await AdminFindById({
                id: data.id,
            });
            if (admin.passwordVerificationToken == null) {
                throw new Error('Admin not found.');
            }

            // Set new password and remove the token
            await AdminUpdateOneById({
                id: data.id,
                args: {
                    $set: {
                        passwordVerificationToken: null,
                        password: await encryptPassword(password),
                    },
                },
            });
        } else {
            throw new Error('Invalid user type.');
        }

        return response(req, res, {
            message: 'Password updated successfully.',
        });
    } catch (error) {
        return response(req, res, null, error);
    }
};

export default ResetPasswordController;
