import { Router } from 'express';
import AuthRouter from './auth.router';
import ProfileRouter from './profile.router';
import AdminRouter from './admin.router';
import CustomerRouter from './customer.router';

const AdminIndexRouter = Router();

// Admin authentication
AdminIndexRouter.use('/auth', AuthRouter);

// Admin profile management
AdminIndexRouter.use('/profile', ProfileRouter);

// Admin profile management
AdminIndexRouter.use('/customer', CustomerRouter);

// Admins
AdminIndexRouter.use('/', AdminRouter);

export default AdminIndexRouter;
