import { type Request, type Response } from 'express';
import response from '../../../../libs/response';
import { type Admin_UpdateContactNumberRequest_RequestType } from '../../../requests/admin/profile.request';
import { type AdminDataType } from '../../../schemas/admin.schema';
import { AdminUpdateOneById } from '../../../service/admin.service';
import { generateOTP } from '../../../utils/otp';

/**
 * Update admin's contact number.
 * @url     /admin/profile/update/contact-number
 * @access  Private
 * @method  POST
 */
const AdminUpdateContactNumberController = async (
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> => {
    try {
        const admin: AdminDataType = req.body.user;
        const {
            body: { contactNumber },
        }: Admin_UpdateContactNumberRequest_RequestType = req.body.parsedData;

        const contactNumberVerificationToken = generateOTP(4);
        await AdminUpdateOneById({
            id: admin.id,
            args: {
                $set: {
                    contactNumberVerificationToken,
                    newContactNumber: contactNumber,
                    contactNumberVerificationTokenSentAt: new Date(),
                },
            },
        });

        // Send OTP via SMS.

        return response(req, res, {
            message: 'OTP has been sent to your contact number.',
        });
    } catch (error) {
        return response(req, res, null, error);
    }
};

export default AdminUpdateContactNumberController;
