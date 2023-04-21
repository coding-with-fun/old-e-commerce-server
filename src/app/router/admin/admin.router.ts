import { Router } from 'express';
import AdminGetAdminListController from '../../controllers/admin/admin/getAdminList.controller';
import AdminUpdateActivationController from '../../controllers/admin/admin/updateAdminActivation.controller';
import requestValidator from '../../middlewares/requestValidator';
import {
    AdminListRequest,
    AdminUpdateActivationRequest,
} from '../../requests/admin/admin.request';

const AdminRouter = Router();

AdminRouter.get(
    '/list',
    requestValidator(AdminListRequest, true),
    AdminGetAdminListController
);

AdminRouter.post(
    '/toggle-activation',
    requestValidator(AdminUpdateActivationRequest),
    AdminUpdateActivationController
);

export default AdminRouter;
