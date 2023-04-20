import { type JwtPayload } from 'jsonwebtoken';

export enum USER_TYPES {
    USER = 'USER',
    ADMIN = 'ADMIN',
}

export enum UPLOAD_TYPES {
    IMAGE,
    VIDEO,
    FILE,
}

export enum CronEnums {
    EVERY_MINUTE = '* * * * * ',
    EVERY_FIVE_MINUTES = '*/5 * * * * ',
    EVERY_10_MINUTES = '*/10 * * * * ',
    EVERY_15_MINUTES = '*/15 * * * * ',
    EVERY_30_MINUTES = '*/30 * * * *',
    EVERY_HOUR = '0 * * * *',
    EVERYDAY_MIDNIGHT = '0 0 * * *',
    EVERY_YEAR = '0 0 * 11 *',
}

export interface jwtDataType extends JwtPayload {
    type: USER_TYPES;
    id: string;
}

export const ALLOWED_IMAGE_TYPE = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/webp',
    'image/heic',
];

export const ALLOWED_VIDEO_TYPE = ['video/mp4'];

export const ALLOWED_FILE_TYPES = ['application/pdf'];
