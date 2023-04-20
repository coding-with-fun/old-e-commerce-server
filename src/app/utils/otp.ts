import env from '../../env';
import { getTimeDifference } from './time';

export const generateOTP = (length = 4): string => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return env.node === 'local' ? '1234' : otp;
};

export const verifyOTP = ({
    inputOTP,
    savedOTP,
    sentAt,
    validTimeDifference = 5,
}: {
    inputOTP: string;
    savedOTP?: string;
    sentAt?: Date;
    validTimeDifference?: number;
}): boolean => {
    if (savedOTP == null || sentAt == null) {
        throw new Error('OTP is not sent.');
    }

    const timeDifference = getTimeDifference(sentAt);

    if (inputOTP !== savedOTP) {
        throw new Error('OTP does not match.');
    }

    if (timeDifference > validTimeDifference) {
        throw new Error('OTP has expired.');
    }

    return true;
};
