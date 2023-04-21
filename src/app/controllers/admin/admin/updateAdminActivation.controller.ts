import { type Request, type Response } from 'express';
import response from '../../../../libs/response';
import { type Admin_UpdateActivation_RequestType } from '../../../requests/admin/admin.request';
import { type AdminDataType } from '../../../schemas/admin.schema';
import {
    AdminFindById,
    AdminUpdateOneById,
} from '../../../service/admin.service';

/**
 * Update activation status of admin.
 * @url     /admin/toggle-activation
 * @access  Private
 * @method  POST
 */
const AdminUpdateActivationController = async (
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> => {
    try {
        const {
            body: { adminId },
        }: Admin_UpdateActivation_RequestType = req.body.parsedData;
        const loggedAdmin: AdminDataType = req.body.user;

        if (loggedAdmin._id === adminId) {
            throw new Error('You can not activate or deactivate yourself.');
        }

        const admin = await AdminFindById({
            id: adminId,
            bypassActivationCheck: true,
        });

        if (admin.isSuperAdmin) {
            throw new Error(
                'You can not activate or deactivate the super admin.'
            );
        }

        await AdminUpdateOneById({
            id: adminId,
            args: {
                isActive: !admin.isActive,
            },
            bypassActivationCheck: true,
        });

        return response(req, res, {
            message: admin.isActive
                ? 'Admin deactivated successfully.'
                : 'Admin activated successfully.',
        });
    } catch (error) {
        return response(req, res, null, error);
    }
};

export default AdminUpdateActivationController;
