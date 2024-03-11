import { cleanEnv, str, port, bool, num, url } from 'envalid';

const APP =
{
    APP_DEFAULT: str(),
    APP_PATH: str(),
    APP_PORT: port(),
    APP_SET_APP_PROXY: bool(),
    APP_SET_COOKIE_SECURE: bool(),
    APP_SET_COOKIE_SAME_SITE: str(),
    APP_CORS: str()
};

const AUTH =
{
    AUTH_API_KEY: str(),
    AUTH_HOST: str(),
    AUTH_SECRET: str(),
    AUTH_AUTHORIZATION: bool()
};

const CACHE =
{
    CACHE_HOST: str({ default: 'redis' }),
    CACHE_PORT: port({ default: 6379 }),
    CACHE_USER: str({ default: 'experience' }),
    CACHE_PASSWORD: str({ default: '12345678' }),
    CACHE_ENABLE: bool({ default: false })
};

const MESSAGE_BROKER =
{
    MESSAGE_BROKER_URI: str()
};

const DB =
{
    DB_URI: str(),
    DB_ORM_DEFAULT: str()
};

const FILESYSTEM =
{
    MINIO_HOST: str(),
    MINIO_ACCESS_KEY: str(),
    MINIO_SECRET_KEY: str(),
    MINIO_USE_SSL: bool(),
    MINIO_PORT: port(),
    MINIO_PUBLIC_BUCKET: str(),
    MINIO_PRIVATE_BUCKET: str(),
    MINIO_REGION: str(),
    FILESYSTEM_DEFAULT: str()
};

const JWT =
{
    JWT_SECRET: str(),
    JWT_EXPIRES: num(),
    JWT_ISS: str(),
    JWT_AUD: str()
};

const SMTP =
{
    SMTP_HOST: str(),
    SMTP_USERNAME: str({ default: '' }),
    SMTP_PASSWORD: str({ default: '' }),
    SMTP_PORT: num(),
    SMTP_SECURE_SSL: bool(),
    SMTP_SENDER_NAME: str(),
    SMTP_SENDER_EMAIL_DEFAULT: str(),
    SMTP_TEMPLATE_DIR: str({ default: 'src/Shared/Infrastructure/templates/emails' })
};

const URL =
{
    URL_API: url(),
    URL_WEB: url()
};

const PUSH =
{
    PUSH_PUBLIC_KEY: str(),
    PUSH_PRIVATE_KEY: str()
};

export class MainConfig
{
    static getEnv()
    {
        return cleanEnv(process.env, {
            NODE_ENV: str({ default: 'development' }),

            ...APP,
            ...AUTH,
            ...CACHE,
            ...MESSAGE_BROKER,
            ...DB,
            ...FILESYSTEM,

            TZ: str(),

            ...JWT,
            ...SMTP,
            ...URL,

            PRODUCT_NAME: str(),
            ENCRYPTION_DEFAULT: str(),

            ...PUSH,

            EXECUTE_CRONS: bool()
        });
    }
}
