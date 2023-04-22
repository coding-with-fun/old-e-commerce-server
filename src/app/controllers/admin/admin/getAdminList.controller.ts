import { type Request, type Response } from 'express';
import response from '../../../../libs/response';
import { type Admin_List_RequestType } from '../../../requests/admin/admin.request';
import { AdminFindAll } from '../../../service/admin.service';
import cleanAdminData from '../../../response/adminData.response';

/**
 * Fetch list of admins.
 * @url     /admin/list
 * @access  Private
 * @method  GET
 */
const AdminGetAdminListController = async (
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> => {
    try {
        const { pagination }: Admin_List_RequestType = req.body.parsedData;

        const { admins, page, perPage, total, field, sort, query } =
            await AdminFindAll({
                pagination,
            });
        return response(req, res, {
            message: 'Admins fetched successfully.',
            admins: admins.map((admin) => {
                return cleanAdminData(admin);
            }),
            filter: {
                page,
                pageSize: perPage,
                total,
                field,
                sort,
                query,
            },
        });
    } catch (error) {
        return response(req, res, null, error);
    }
};

export default AdminGetAdminListController;
