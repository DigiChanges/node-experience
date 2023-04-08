import { DataSource } from 'typeorm';
import { newDb } from 'pg-mem';
import Item from '../../../Item/Infrastructure/Schemas/ItemTypeORM';
import File from '../../../File/Infrastructure/Schemas/FileTypeORM';
import FileVersion from '../../../File/Infrastructure/Schemas/FileVersionTypeORM';
import Notification from '../../../Notification/Infrastructure/Schemas/NotificationTypeORM';
import ICreateConnection from './ICreateConnection';

export let dataSource: DataSource; // TODO: Change this global var

class CreateTypeORMConnection implements ICreateConnection
{
    private readonly config: any;
    private entities = [
        FileVersion,
        File,
        Notification,
        Item
    ];

    constructor(config: any)
    {
        this.config = config;
    }

    async initConfig(): Promise<void>
    {
        dataSource = new DataSource({ ...this.config, entities: this.entities });
    }

    async initConfigTest(): Promise<void>
    {
        // ==== get a memory db
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

        dataSource = db.adapters.createTypeormDataSource({
            type: 'postgres',
            entities: [...this.entities]
        });
    }

    async create(): Promise<void>
    {
        await dataSource.initialize();
    }

    async close(force = true): Promise<void>
    {
        await dataSource.destroy();
    }

    async synchronize(): Promise<void>
    {
        await dataSource.synchronize(true);
    }

    async drop(): Promise<void>
    {
        await dataSource.dropDatabase();
    }
}

export default CreateTypeORMConnection;
