import { object, string, type z } from 'zod';

// Reset password for all users.
export const ResetPasswordRequest = object({
    body: object({
        password: string({
            invalid_type_error: 'Password is required.',
            required_error: 'Password is required.',
        }).nonempty('Password is required.'),
        token: string({
            invalid_type_error: 'Token is required.',
            required_error: 'Token is required.',
        }).nonempty('Token is required.'),
    }),
});
export type ResetPassword_RequestType = z.infer<typeof ResetPasswordRequest>;

// Verify email for all users.
export const VerifyEmailRequest = object({
    body: object({
        token: string({
            invalid_type_error: 'Token is required.',
            required_error: 'Token is required.',
        }).nonempty('Token is required.'),
    }),
});
export type VerifyEmail_RequestType = z.infer<typeof VerifyEmailRequest>;
