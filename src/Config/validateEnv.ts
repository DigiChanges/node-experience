import { cleanEnv, str, port, bool, num, url } from 'envalid';

export function validateEnv()
{
    return cleanEnv(process.env, {
        NODE_ENV: str({ default: 'development' }),

        APP_DEFAULT: str(),
        APP_PATH: str(),
        APP_PORT: port(),
        APP_SET_APP_PROXY: bool(),
        APP_SET_COOKIE_SECURE: bool(),
        APP_SET_COOKIE_SAME_SITE: str(),
        APP_CORS: str(),

        AUTH_API_KEY: str(),
        AUTH_HOST: str(),
        AUTH_SECRET: str(),
        AUTH_AUTHORIZATION: bool(),

        CACHE_HOST: str({ default: 'redis' }),
        CACHE_PORT: port({ default: 6379 }),
        CACHE_USER: str({ default: 'experience' }),
        CACHE_PASSWORD: str({ default: '12345678' }),
        CACHE_ENABLE: bool({ default: false }),

        MESSAGE_BROKER_PROTOCOL: str(),
        MESSAGE_BROKER_HOST: str(),
        MESSAGE_BROKER_PORT: port(),
        MESSAGE_BROKER_USER: str(),
        MESSAGE_BROKER_PASSWORD: str(),

        DB_URI: str(),
        DB_ORM_DEFAULT: str(),
        DB_TYPE: str(),

        MINIO_HOST: str(),
        MINIO_ACCESS_KEY: str(),
        MINIO_SECRET_KEY: str(),
        MINIO_USE_SSL: bool(),
        MINIO_PORT: port(),
        MINIO_PUBLIC_BUCKET: str(),
        MINIO_PRIVATE_BUCKET: str(),
        MINIO_REGION: str(),
        FILESYSTEM_DEFAULT: str(),

        TZ: str(),

        JWT_SECRET: str(),
        JWT_EXPIRES: num(),
        JWT_ISS: str(),
        JWT_AUD: str(),

        SMTP_HOST: str(),
        SMTP_PORT: num(),
        SMTP_SECURE_SSL: bool(),
        SMTP_SENDER_NAME: str(),
        SMTP_SENDER_EMAIL_DEFAULT: str(),

        URL_API: url(),
        URL_WEB: url(),

        PRODUCT_NAME: str(),
        ENCRYPTION_DEFAULT: str(),
        PUSH_PRIVATE_KEY: str(),
        PUSH_PUBLIC_KEY: str(),
        EXECUTE_CRONS: bool()
    });
}
