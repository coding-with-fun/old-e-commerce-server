import { Router } from 'express';
import AuthRouter from './auth.router';
import ProfileRouter from './profile.router';
import AdminRouter from './admin.router';

const AdminIndexRouter = Router();

// Admin authentication
AdminIndexRouter.use('/auth', AuthRouter);

// Admin profile management
AdminIndexRouter.use('/profile', ProfileRouter);

// Admins
AdminIndexRouter.use('/', AdminRouter);

export default AdminIndexRouter;
