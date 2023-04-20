import { object, type z } from 'zod';
import { type PaginationType } from '../../middlewares/paginationCleaner';

// Sign in for admin.
export const AdminListRequest = object({});
export type Admin_List_RequestType = z.infer<typeof AdminListRequest> &
    PaginationType;
