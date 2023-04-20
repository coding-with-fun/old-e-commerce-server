import { nanoid } from 'nanoid';
import {
    ALLOWED_FILE_TYPES,
    ALLOWED_IMAGE_TYPE,
    ALLOWED_VIDEO_TYPE,
    UPLOAD_TYPES,
} from './types';

export const convertToCamelCase = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const validFileTypes = (type: UPLOAD_TYPES): string[] => {
    if (type === UPLOAD_TYPES.IMAGE) {
        return ALLOWED_IMAGE_TYPE;
    } else if (type === UPLOAD_TYPES.VIDEO) {
        return ALLOWED_VIDEO_TYPE;
    } else if (type === UPLOAD_TYPES.FILE) {
        return ALLOWED_FILE_TYPES;
    }
    return [];
};

export const getRandomString = (length = 25): string => {
    return nanoid(length);
};
