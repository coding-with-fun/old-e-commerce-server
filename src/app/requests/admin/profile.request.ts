import mongoose from 'mongoose';
import { object, string, type z } from 'zod';

// Update admin profile.
export const AdminUpdateProfileRequest = object({
    body: object({
        name: string({
            invalid_type_error: 'Name is required.',
            required_error: 'Name is required.',
        }).nonempty('Name is required.'),
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
export type Admin_UpdateProfile_RequestType = z.infer<
    typeof AdminUpdateProfileRequest
>;

// Update admin email address.
export const AdminUpdateEmailRequest = object({
    body: object({
        email: string({
            invalid_type_error: 'Email is required.',
            required_error: 'Email is required.',
        })
            .nonempty('Email is required.')
            .email('Not a valid email.'),
    }),
});
export type Admin_UpdateEmailRequest_RequestType = z.infer<
    typeof AdminUpdateEmailRequest
>;

// Update admin contact number.
export const AdminUpdateContactNumberRequest = object({
    body: object({
        contactNumber: string({
            invalid_type_error: 'Contact number is required.',
            required_error: 'Contact number is required.',
        })
            .nonempty('Contact number is required.')
            .regex(
                /^([+]\d{2})?\d{10}$/,
                'Please enter a valid contact number.'
            ),
    }),
});
export type Admin_UpdateContactNumberRequest_RequestType = z.infer<
    typeof AdminUpdateContactNumberRequest
>;

// Verify admin contact number.
export const AdminVerifyContactNumberRequest = object({
    body: object({
        contactNumber: string({
            invalid_type_error: 'Contact number is required.',
            required_error: 'Contact number is required.',
        })
            .nonempty('Contact number is required.')
            .regex(
                /^([+]\d{2})?\d{10}$/,
                'Please enter a valid contact number.'
            ),
        otp: string({
            invalid_type_error: 'OTP is required.',
            required_error: 'OTP is required.',
        }).nonempty('OTP is required.'),
    }),
});
export type Admin_VerifyContactNumberRequest_RequestType = z.infer<
    typeof AdminVerifyContactNumberRequest
>;
