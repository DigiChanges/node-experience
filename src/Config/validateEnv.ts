import { cleanEnv, str, port, bool, num, url } from 'envalid';

export function validateEnv()
{
    return cleanEnv(process.env, {
        NODE_ENV: str(),
        SERVER_PORT: port(),

        DB_HOST: str(),
        DB_USER: str(),
        DB_DATABASE: str(),
        DB_PASSWORD: str(),
        DB_PORT: port(),
        DB_SYNCHRONIZE: bool(),
        DB_TYPE_DEFAULT: str(),

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

        AUTHORIZATION: bool(),
        PRODUCT_NAME: str(),
        ENCRYPTION_DEFAULT: str(),
        PUSH_PRIVATE_KEY: str(),
        PUSH_PUBLIC_KEY: str(),
        EXECUTE_CRONS: bool()
    });
}
