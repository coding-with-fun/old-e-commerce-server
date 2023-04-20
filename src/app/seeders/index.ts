import { Router } from 'express';
import AdminSeeder from './admin.seeder';

const seederRouter = Router();

seederRouter.post('/admin', AdminSeeder);

export default seederRouter;
