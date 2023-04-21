import { type Request, type Response } from 'express';
import response from '../../../../libs/response';
import { type Admin_VerifyContactNumberRequest_RequestType } from '../../../requests/admin/profile.request';
import { type AdminDataType } from '../../../schemas/admin.schema';
import { verifyOTP } from '../../../utils/otp';
import { AdminUpdateOneById } from '../../../service/admin.service';

/**
 * Verify admin's contact number.
 * @url     /admin/profile/update/verify-contact-number
 * @access  Private
 * @method  POST
 */
const AdminVerifyContactNumberController = async (
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> => {
    try {
        const admin: AdminDataType = req.body.user;
        const {
            body: { contactNumber, otp },
        }: Admin_VerifyContactNumberRequest_RequestType = req.body.parsedData;

        if (admin.newContactNumber !== contactNumber) {
            throw new Error('OTP is not sent.');
        }

        verifyOTP({
            inputOTP: otp,
            savedOTP: admin.contactNumberVerificationToken,
            sentAt: admin.contactNumberVerificationTokenSentAt,
        });

        const updatedAdmin: AdminDataType = await AdminUpdateOneById({
            id: admin.id,
            args: {
                $set: {
                    contactNumber: admin.newContactNumber,
                    contactNumberVerificationToken: null,
                    contactNumberVerificationTokenSentAt: null,
                    newContactNumber: null,
                },
            },
        });

        return response(req, res, {
            message: 'Contact number updated successfully.',
            admin: updatedAdmin,
        });
    } catch (error) {
        return response(req, res, null, error);
    }
};

export default AdminVerifyContactNumberController;
