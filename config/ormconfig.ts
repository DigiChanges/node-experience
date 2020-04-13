import { ConnectionOptions } from "typeorm";
import globalConfig from "./config";

const config: ConnectionOptions = {
    type: 'mongodb',
    host: String(globalConfig.dbConfig.host),
    port: Number(globalConfig.dbConfig.port),
    username: String(globalConfig.dbConfig.user),
    password: String(globalConfig.dbConfig.password),
    database: String(globalConfig.dbConfig.database),
    entities: [
        process.cwd() + "/src/Entities/*{.ts,.js}"
    ],
    synchronize: true,
    migrations: [
        "../src/Migrations/**/*.ts"
    ],
    subscribers: [
        "../src/Subscribers/**/*.ts"
    ],
    cli: {
        "entitiesDir": "../src/Entities",
        "migrationsDir": "../src/Migrations",
        "subscribersDir": "../src/Subscribers"
    }
};

export default config;