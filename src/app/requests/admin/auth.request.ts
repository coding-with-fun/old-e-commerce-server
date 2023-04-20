import { object, string, type z } from 'zod';

// Sign in for admin.
export const AdminSignInRequest = object({
    body: object({
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
    }),
});
export type Admin_SignIn_RequestType = z.infer<typeof AdminSignInRequest>;

// Verify OTP for admin sign in.
export const AdminVerifySignInOtpRequest = object({
    body: object({
        email: string({
            invalid_type_error: 'Email is required.',
            required_error: 'Email is required.',
        })
            .nonempty('Email is required.')
            .email('Not a valid email.'),
        otp: string({
            invalid_type_error: 'OTP is required.',
            required_error: 'OTP is required.',
        }).nonempty('OTP is required.'),
    }),
});
export type Admin_VerifySignInOtp_RequestType = z.infer<
    typeof AdminVerifySignInOtpRequest
>;

// Verify OTP for admin sign in.
export const AdminForgotPasswordRequest = object({
    body: object({
        email: string({
            invalid_type_error: 'Email is required.',
            required_error: 'Email is required.',
        })
            .nonempty('Email is required.')
            .email('Not a valid email.'),
    }),
});
export type Admin_ForgotPassword_RequestType = z.infer<
    typeof AdminForgotPasswordRequest
>;
