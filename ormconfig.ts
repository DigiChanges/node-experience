import { ConnectionOptions } from 'typeorm';
import dotenv from "dotenv";

dotenv.config();

const config: ConnectionOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: true,
    migrations: [
        "src/Migrations/**/*.ts"
    ],
    subscribers: [
        "src/Subscribers/**/*.ts"
    ],
    cli: {
        "entitiesDir": "src/Entities",
        "migrationsDir": "src/Migrations",
        "subscribersDir": "src/Subscribers"
    }
};

export default config;