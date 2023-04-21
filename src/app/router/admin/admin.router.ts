import { Router } from 'express';
import AdminDeleteController from '../../controllers/admin/admin/deleteAdmin.controller';
import AdminGetAdminListController from '../../controllers/admin/admin/getAdminList.controller';
import AdminUpdateActivationController from '../../controllers/admin/admin/updateAdminActivation.controller';
import requestValidator from '../../middlewares/requestValidator';
import { verifyAdmin } from '../../middlewares/verifyUser';
import {
    AdminCreateRequest,
    AdminDeleteRequest,
    AdminGetDetailsRequest,
    AdminListRequest,
    AdminUpdateActivationRequest,
} from '../../requests/admin/admin.request';
import AdminGetDetailsController from '../../controllers/admin/admin/getAdminDetails.controller';
import AdminCreateController from '../../controllers/admin/admin/createAdmin.controller';

const AdminRouter = Router();

AdminRouter.get(
    '/list',
    verifyAdmin,
    requestValidator(AdminListRequest, true),
    AdminGetAdminListController
);

AdminRouter.post(
    '/toggle-activation',
    verifyAdmin,
    requestValidator(AdminUpdateActivationRequest),
    AdminUpdateActivationController
);

AdminRouter.post(
    '/create',
    verifyAdmin,
    requestValidator(AdminCreateRequest),
    AdminCreateController
);

AdminRouter.post(
    '/delete',
    verifyAdmin,
    requestValidator(AdminDeleteRequest),
    AdminDeleteController
);

AdminRouter.get(
    '/:adminId',
    verifyAdmin,
    requestValidator(AdminGetDetailsRequest),
    AdminGetDetailsController
);

export default AdminRouter;
