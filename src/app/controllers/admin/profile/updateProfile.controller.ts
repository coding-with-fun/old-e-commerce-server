import { type Request, type Response } from 'express';
import { type UpdateQuery } from 'mongoose';
import response from '../../../../libs/response';
import deleteFiles from '../../../../libs/s3/deleteFiles';
import { type Admin_UpdateProfile_RequestType } from '../../../requests/admin/profile.request';
import cleanAdminData from '../../../response/adminData.response';
import {
    type AdminDataType,
    type IAdminSchema,
} from '../../../schemas/admin.schema';
import TempFile, {
    type TempFileDataType,
} from '../../../schemas/tempFile.schema';
import { AdminUpdateOneById } from '../../../service/admin.service';

/**
 * Update admin's profile.
 * @url     /admin/profile/update
 * @access  Private
 * @method  POST
 */
const AdminUpdateProfileController = async (
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> => {
    try {
        const admin: AdminDataType = req.body.user;
        const {
            body: { name, profilePictureId },
        }: Admin_UpdateProfile_RequestType = req.body.parsedData;

        let image: TempFileDataType | null = null;
        if (profilePictureId != null) {
            image = await TempFile.findById(profilePictureId);
            if (image == null) {
                throw new Error('No image found.');
            }

            if (admin.profilePictureFileName !== '') {
                await deleteFiles([admin.profilePictureFileName]);
            }
        }

        let args: UpdateQuery<IAdminSchema> = {
            name,
        };
        if (image != null) {
            args = {
                ...args,
                profilePictureUrl: image.url,
                profilePictureFileName: image.fileName,
            };
        }
        const updatedAdmin = await AdminUpdateOneById(admin._id, args);

        if (profilePictureId != null) {
            await TempFile.findByIdAndDelete(profilePictureId);
        }

        return response(req, res, {
            admin: cleanAdminData(updatedAdmin),
            message: 'Profile updated successfully.',
        });
    } catch (error) {
        return response(req, res, null, error);
    }
};

export default AdminUpdateProfileController;
