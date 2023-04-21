import { type Request, type Response } from 'express';
import response from '../../../../libs/response';
import { type Admin_Delete_RequestType } from '../../../requests/admin/admin.request';
import { type AdminDataType } from '../../../schemas/admin.schema';
import {
    AdminFindById,
    AdminUpdateOneById,
} from '../../../service/admin.service';

/**
 * Delete admin.
 * @url     /admin/delete
 * @access  Private
 * @method  POST
 */
const AdminDeleteController = async (
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> => {
    try {
        const {
            body: { adminId },
        }: Admin_Delete_RequestType = req.body.parsedData;
        const loggedAdmin: AdminDataType = req.body.user;

        if (loggedAdmin._id.toString() === adminId) {
            throw new Error('You can not delete yourself.');
        }

        const admin = await AdminFindById({
            id: adminId,
            bypassActivationCheck: true,
        });

        if (admin.isSuperAdmin) {
            throw new Error('You can not delete the super admin.');
        }

        await AdminUpdateOneById({
            id: adminId,
            args: {
                deletedAt: new Date(),
                email: `${admin.email}+${Date.now()}`,
                contactNumber: `${admin.contactNumber}+${Date.now()}`,
            },
            bypassActivationCheck: true,
            bypassDeleteCheck: true,
        });

        return response(req, res, {
            message: 'Admin deleted successfully.',
        });
    } catch (error) {
        return response(req, res, null, error);
    }
};

export default AdminDeleteController;
