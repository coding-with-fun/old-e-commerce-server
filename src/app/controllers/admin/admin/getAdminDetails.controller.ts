import { type Request, type Response } from 'express';
import response from '../../../../libs/response';
import { type Admin_GetDetails_RequestType } from '../../../requests/admin/admin.request';
import cleanAdminData from '../../../response/adminData.response';
import { AdminFindById } from '../../../service/admin.service';

/**
 * Get admin details.
 * @url     /admin/:adminId
 * @access  Private
 * @method  GET
 */
const AdminGetDetailsController = async (
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> => {
    try {
        const {
            params: { adminId },
        }: Admin_GetDetails_RequestType = req.body.parsedData;

        const admin = await AdminFindById({
            id: adminId,
            bypassActivationCheck: true,
        });

        return response(req, res, {
            message: 'Admin deleted successfully.',
            admin: cleanAdminData(admin),
        });
    } catch (error) {
        return response(req, res, null, error);
    }
};

export default AdminGetDetailsController;
