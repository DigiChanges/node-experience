import { ConnectionOptions } from "typeorm";
import globalConfig from "./config";
import { join } from 'path'

let entities = process.cwd() + "/src/Entities/*{.ts,.js}";
let migrations = process.cwd() + "/src/Migrations/*{.ts,.js}";
let subscribers = process.cwd() + "/src/Subscribers/*{.ts,.js}";

let entitiesDir = process.cwd() + "/dist/src/Entities";
let migrationsDir = process.cwd() + "/dist/src/Migrations";
let subscribersDir = process.cwd() + "/dist/src/Subscribers";

if ( process.env.NODE_ENV === 'production' )
{
    entities = join(__dirname, '../src/Entities/*{.ts,.js}');
    migrations = join(__dirname, '../src/Migrations/*{.ts,.js}');
    subscribers = join(__dirname, '../src/Subscribers/*{.ts,.js}');

    entitiesDir = join(__dirname, '../src/Entities');
    migrationsDir = join(__dirname, '../src/Migrations');
    subscribersDir = join(__dirname, '../src/Subscribers');
}

const config: ConnectionOptions = {
    type: 'mongodb',
    host: String(globalConfig.dbConfig.host),
    port: Number(globalConfig.dbConfig.port),
    username: String(globalConfig.dbConfig.user),
    password: String(globalConfig.dbConfig.password),
    database: String(globalConfig.dbConfig.database),
    synchronize: Boolean(globalConfig.dbConfig.synchronize),
    migrationsRun: false,
    entities: [
        entities
    ],
    migrations: [
        migrations
    ],
    subscribers: [
        subscribers
    ],
    cli: {
        "entitiesDir": entitiesDir,
        "migrationsDir": migrationsDir,
        "subscribersDir": subscribersDir
    }
};

export default config;