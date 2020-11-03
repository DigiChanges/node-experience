import {cleanEnv, str, port, bool, num, url} from 'envalid';

export function validateEnv() {
    cleanEnv(process.env, {
        NODE_ENV: str(),
        SERVER_PORT: port(),
        DB_HOST: str(),
        DB_USER: str(),
        DB_DATABASE: str(),
        DB_PASSWORD: str(),
        DB_PORT: port(),
        DB_SINCRONIZE: bool(),
        TZ: str(),
        JWT_SECRET: str(),
        JWT_EXPIRES: num(),
        JWT_ISS: str(),
        JWT_AUD: str(),
        SMTP_HOST: str(),
        SMTP_PORT: num(),
        SMTP_SECURE_SSL: bool(),
        SMTP_SENDERNAME: str(),
        SMTP_SENDER_EMAIL_DEFAULT: str(),
        URL_API: url(),
        URL_WEB: url(),
        AUTHORIZATION: bool(),
        PRODUCT_NAME: str(),
        ENCRYPTION_DEFAULT: str(),
        PUSH_PRIVATE_KEY: str(),
        PUSH_PUBLIC_KEY: str(),
    });
}
