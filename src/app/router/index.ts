import { Router } from 'express';
import Ping from '../controllers';
import AdminIndexRouter from './admin';
import CommonRouter from './common.router';

const router = Router();

router.get('/', Ping);

// Admin routes
router.use('/admin', AdminIndexRouter);

// Common routes
router.use('/', CommonRouter);

export default router;
