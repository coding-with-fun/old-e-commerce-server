import { Router } from 'express';
import requestValidator from '../../middlewares/requestValidator';
import { AdminCreateCustomerRequest } from '../../requests/admin/customer.request';
import AdminCreateCustomerController from '../../controllers/admin/customer/createCustomer.controller';

const CustomerRouter = Router();

CustomerRouter.post(
    '/create',
    requestValidator(AdminCreateCustomerRequest),
    AdminCreateCustomerController
);

export default CustomerRouter;
