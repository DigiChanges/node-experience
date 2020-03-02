import { cleanEnv, str, port } from 'envalid';

export function validateEnv() {
    cleanEnv(process.env, {
        DB_HOST: str(),
        DB_USER: str(),
        DB_DATABASE: str(),
        DB_PASSWORD: str(),
        DB_PORT: port(),
    });
}

