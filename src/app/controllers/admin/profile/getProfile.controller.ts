import { type Request, type Response } from 'express';
import response from '../../../../libs/response';
import cleanAdminData from '../../../response/adminData.response';
import { type AdminDataType } from '../../../schemas/admin.schema';

/**
 * Get admin's profile.
 * @url     /admin/profile
 * @access  Private
 * @method  GET
 */
const AdminGetProfileController = async (
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> => {
    try {
        const admin: AdminDataType = req.body.user;

        return response(req, res, {
            admin: cleanAdminData(admin),
        });
    } catch (error) {
        return response(req, res, null, error);
    }
};

export default AdminGetProfileController;
