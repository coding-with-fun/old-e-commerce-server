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

// Delete admin.
export const AdminDeleteRequest = object({
    body: object({
        adminId: string({
            invalid_type_error: 'Admin ID is required.',
            required_error: 'Admin ID is required.',
        }).nonempty('Admin ID is required.'),
    }).refine((data) => mongoose.Types.ObjectId.isValid(data.adminId)),
});
export type Admin_Delete_RequestType = z.infer<typeof AdminDeleteRequest>;

// Get admin details.
export const AdminGetDetailsRequest = object({
    params: object({
        adminId: string({
            invalid_type_error: 'Admin ID is required.',
            required_error: 'Admin ID is required.',
        }).nonempty('Admin ID is required.'),
    }).refine((data) => mongoose.Types.ObjectId.isValid(data.adminId)),
});
export type Admin_GetDetails_RequestType = z.infer<
    typeof AdminGetDetailsRequest
>;

// Create new admin.
export const AdminCreateRequest = object({
    body: object({
        name: string({
            invalid_type_error: 'Name is required.',
            required_error: 'Name is required.',
        }).nonempty('Name is required.'),
        contactNumber: string({
            invalid_type_error: 'Contact number is required.',
            required_error: 'Contact number is required.',
        })
            .nonempty('Contact number is required.')
            .regex(
                /^([+]\d{2})?\d{10}$/,
                'Please enter a valid contact number.'
            ),
        email: string({
            invalid_type_error: 'Email is required.',
            required_error: 'Email is required.',
        })
            .nonempty('Email is required.')
            .email('Not a valid email.'),
        password: string({
            invalid_type_error: 'Password is required.',
            required_error: 'Password is required.',
        }).nonempty('Password is required.'),
        profilePictureId: string().nullable().optional(),
    }).refine(
        (data) =>
            data.profilePictureId != null && data.profilePictureId !== ''
                ? mongoose.Types.ObjectId.isValid(data.profilePictureId)
                : true,
        {
            message: 'Invalid profile picture ID.',
        }
    ),
});
export type Admin_Create_RequestType = z.infer<typeof AdminCreateRequest>;
