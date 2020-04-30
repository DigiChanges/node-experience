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
        process.cwd() + "/src/Migrations/**/*.ts"
    ],
    subscribers: [
        process.cwd() + "/src/Subscribers/**/*.ts"
    ],
    cli: {
        "entitiesDir": process.cwd() + "/src/Entities",
        "migrationsDir": process.cwd() + "/src/Migrations",
        "subscribersDir": process.cwd() + "/src/Subscribers"
    }
};

export default config;