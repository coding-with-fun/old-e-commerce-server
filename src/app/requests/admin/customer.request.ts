import mongoose from 'mongoose';
import { object, string, type z } from 'zod';

// Create new admin.
export const AdminCreateCustomerRequest = object({
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
export type Admin_CreateCustomer_RequestType = z.infer<
    typeof AdminCreateCustomerRequest
>;
