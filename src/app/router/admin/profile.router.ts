import { Router } from 'express';
import AdminVerifyContactNumberController from '../../controllers/admin/profile/contactNumberVerification.controller';
import AdminGetProfileController from '../../controllers/admin/profile/getProfile.controller';
import AdminUpdateContactNumberController from '../../controllers/admin/profile/updateContactNumber.controller';
import AdminUpdateEmailController from '../../controllers/admin/profile/updateEmail.controller';
import AdminUpdateProfileController from '../../controllers/admin/profile/updateProfile.controller';
import requestValidator from '../../middlewares/requestValidator';
import { verifyAdmin } from '../../middlewares/verifyUser';
import {
    AdminUpdateContactNumberRequest,
    AdminUpdateEmailRequest,
    AdminUpdateProfileRequest,
    AdminVerifyContactNumberRequest,
} from '../../requests/admin/profile.request';

const ProfileRouter = Router();

ProfileRouter.post(
    '/update/email',
    verifyAdmin,
    requestValidator(AdminUpdateEmailRequest),
    AdminUpdateEmailController
);

ProfileRouter.post(
    '/update/contact-number',
    verifyAdmin,
    requestValidator(AdminUpdateContactNumberRequest),
    AdminUpdateContactNumberController
);

ProfileRouter.post(
    '/update/verify-contact-number',
    verifyAdmin,
    requestValidator(AdminVerifyContactNumberRequest),
    AdminVerifyContactNumberController
);

ProfileRouter.post(
    '/update',
    verifyAdmin,
    requestValidator(AdminUpdateProfileRequest),
    AdminUpdateProfileController
);

ProfileRouter.get('/', verifyAdmin, AdminGetProfileController);

export default ProfileRouter;
