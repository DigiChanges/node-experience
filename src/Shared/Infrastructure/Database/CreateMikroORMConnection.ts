import { MikroORM } from '@mikro-orm/core';
import { newDb } from 'pg-mem';
import User from '../../../User/Infrastructure/Schemas/UserMikroORM';
import Role from '../../../Role/Infrastructure/Schemas/RoleMikroORM';
import Item from '../../../Item/Infrastructure/Schemas/ItemMikroORM';
import File from '../../../File/Infrastructure/Schemas/FileMikroORM';
import ICreateConnection from './ICreateConnection';
import Logger from '../../Application/Logger/Logger';
import { DataSource } from 'typeorm';
// import Notification from '../../Notification/Infrastructure/Schemas/NotificationMikroORM';
// import TokenSchema from '../../AuthHelper/Infrastructure/Schemas/TokenMikroORM';

export let orm: MikroORM = null;

class CreateMikroORMConnection implements ICreateConnection
{
    private readonly config: any;
    private createInstanceConnection: any;
    private entities = [
        Role,
        User,
        Item,
        File
    ];

    constructor(config: any = null)
    {
        this.config = config;
    }

    initConfig(): any
    {
        this.createInstanceConnection = async() =>
        {
            orm = await MikroORM.init({
                entities: this.entities,
                dbName: this.config.dbName,
                type: this.config.type,
                host: this.config.host,
                port: this.config.port,
                user: this.config.user,
                password: this.config.password,
                allowGlobalContext: true
            });

            return this.createInstanceConnection;
        };
    }

    async initConfigTest(): Promise<void>
    {
        const db = newDb({
            autoCreateForeignKeyIndices: true
        });

        db.public.registerFunction({
            implementation: () => 'experience',
            name: 'current_database'
        });

        db.public.registerFunction({
            name: 'version',
            implementation: () =>
            {
                return 'PostgreSQL 11.16 (Debian 11.16-1.pgdg90+1) on x86_64-pc-linux-gnu, compiled by gcc (Debian 6.3.0-18+deb9u1) 6.3.0 20170516, 64-bit';
            }
        });

        db.public.registerFunction({
            name: 'pg_views',
            implementation: () =>
            {
                return [];
            }
        });

        db.public.registerFunction({
            name: 'pg_matviews',
            implementation: () =>
            {
                return null;
            }
        });

        db.public.interceptQueries(text =>
        {
            if (text === 'SELECT \'DROP VIEW IF EXISTS "\' || schemaname || \'"."\' || viewname || \'" CASCADE;\' as "query" FROM "pg_views" WHERE "schemaname" IN (current_schema()) AND "viewname" NOT IN (\'geography_columns\', \'geometry_columns\', \'raster_columns\', \'raster_overviews\')')
            {
                return [];
            }

            if (text === 'SELECT \'DROP MATERIALIZED VIEW IF EXISTS "\' || schemaname || \'"."\' || matviewname || \'" CASCADE;\' as "query" FROM "pg_matviews" WHERE "schemaname" IN (current_schema())')
            {
                return [];
            }

            if (text === 'SELECT \'DROP TABLE IF EXISTS "\' || schemaname || \'"."\' || tablename || \'" CASCADE;\' as "query" FROM "pg_tables" WHERE "schemaname" IN (current_schema()) AND "tablename" NOT IN (\'spatial_ref_sys\')')
            {
                return [];
            }

            if (text === 'SELECT \'DROP TYPE IF EXISTS "\' || n.nspname || \'"."\' || t.typname || \'" CASCADE;\' as "query" FROM "pg_type" "t" INNER JOIN "pg_enum" "e" ON "e"."enumtypid" = "t"."oid" INNER JOIN "pg_namespace" "n" ON "n"."oid" = "t"."typnamespace" WHERE "n"."nspname" IN (current_schema()) GROUP BY "n"."nspname", "t"."typname"')
            {
                return [];
            }

            return null;
        });

        orm = await db.adapters.createMikroOrm({
            entities: [...this.entities]
        });
    }

    async create(): Promise<any>
    {
        return await this.createInstanceConnection();
    }

    async close(force = true): Promise<void>
    {
        await orm.close(force);
    }

    async drop(): Promise<any>
    {
        return Promise.resolve(undefined); // TODO: drop
    }

    async synchronize(): Promise<void>
    {
        const generator = orm.getSchemaGenerator();

        const dropDump = await generator.getDropSchemaSQL();
        Logger.debug(dropDump);

        const createDump = await generator.getCreateSchemaSQL();
        Logger.debug(createDump);

        const updateDump = await generator.getUpdateSchemaSQL();
        Logger.debug(updateDump);
    }
}

export default CreateMikroORMConnection;
