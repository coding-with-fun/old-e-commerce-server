import * as dotenv from 'dotenv';
import { getOsEnv, getOsEnvOptional, toNumber } from './libs/env';

dotenv.config();

/**
 * Environment variables
 */
const env = {
    node: getOsEnv('APP_ENV'),

    app: {
        name: getOsEnv('APP_NAME'),
        host: getOsEnv('APP_URL'),
        admin_panel_url: getOsEnv('APP_ADMIN_PANEL_URL'),
        port: getOsEnv('APP_PORT'),
        root_dir: getOsEnv('APP_ENV') === 'production' ? 'dist' : 'src',
        pagination_limit: toNumber(getOsEnv('APP_PAGINATION_LIMIT')),
    },

    api: {
        api_prefix: getOsEnv('API_PREFIX'),
        user_uploaded_content_path: getOsEnv('USER_UPLOADED_CONTENT_PATH'),
    },

    cors: {
        urls: getOsEnvOptional('CORS_AVAILABLE_LINKS'),
    },

    mongo: {
        mongoURI: getOsEnv('MONGO_URI'),
    },

    jwt: {
        secret: getOsEnv('JWT_SECRET'),
        expiration: getOsEnv('JWT_EXPIRATION'),
    },

    mail: {
        host: getOsEnv('MAIL_HOST'),
        port: toNumber(getOsEnv('MAIL_PORT')),
        username: getOsEnv('MAIL_USERNAME'),
        password: getOsEnv('MAIL_PASSWORD'),
        enc: getOsEnv('MAIL_ENCRYPTION'),
        email_from: getOsEnv('MAIL_EMAIL_FROM'),
        name: getOsEnv('MAIL_FROM_NAME'),
        templatePath: getOsEnv('MAIL_TEMPLATE_PATH'),
    },

    s3: {
        bucket: getOsEnv('S3_BUCKET'),
        endpoint: getOsEnv('S3_ENDPOINT'),
        accessKeyId: getOsEnv('S3_ACCESSKEY'),
        secretAccessKey: getOsEnv('S3_SECRET'),
        maxFileSize: toNumber(getOsEnv('S3_MAX_FILE_SIZE')),
    },
};

export default env;
