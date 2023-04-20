import { Router } from 'express';
import AdminGetAdminListController from '../../controllers/admin/admin/getAdminList.controller';
import requestValidator from '../../middlewares/requestValidator';
import { AdminListRequest } from '../../requests/admin/admin.request';

const AdminRouter = Router();

AdminRouter.get(
    '/list',
    requestValidator(AdminListRequest, true),
    AdminGetAdminListController
);

export default AdminRouter;
