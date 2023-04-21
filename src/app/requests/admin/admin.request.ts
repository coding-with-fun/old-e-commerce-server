import mongoose from 'mongoose';
import { object, string, type z } from 'zod';
import { type PaginationType } from '../../middlewares/paginationCleaner';

// Fetch list of admins.
export const AdminListRequest = object({});
export type Admin_List_RequestType = z.infer<typeof AdminListRequest> &
    PaginationType;

// Update activation status of admin.
export const AdminUpdateActivationRequest = object({
    body: object({
        adminId: string({
            invalid_type_error: 'Admin ID is required.',
            required_error: 'Admin ID is required.',
        }).nonempty('Admin ID is required.'),
    }).refine((data) => mongoose.Types.ObjectId.isValid(data.adminId)),
});
export type Admin_UpdateActivation_RequestType = z.infer<
    typeof AdminUpdateActivationRequest
>;
