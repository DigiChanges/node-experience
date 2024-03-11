import { MikroORM } from '@mikro-orm/postgresql';
import { newDb } from 'pg-mem';
import Item from '../../../Item/Infrastructure/Schemas/ItemMikroORM';
import ICreateConnection from './ICreateConnection';
import Logger from '../../../Shared/Helpers/Logger';

export let orm: MikroORM;

class CreateMikroORMConnection implements ICreateConnection
{
    private readonly config: any;
    private createInstanceConnection: any;
    private entities = [
        Item
    ];

    constructor(config: any = null)
    {
        this.config = config;
    }

    async initConfig(): Promise<void>
    {
        this.createInstanceConnection = async() =>
        {
            orm = await MikroORM.init({
                entities: this.entities,
                clientUrl: this.config.DB_URI,
                allowGlobalContext: true
            });

            return this.createInstanceConnection;
        };
    }

    async initConfigTest(): Promise<void>
    {
        const db = newDb();

        orm = await db.adapters.createMikroOrm({
            entities: [...this.entities]
        });

        const generator = orm.getSchemaGenerator();

        await generator.dropSchema();
        await generator.getCreateSchemaSQL();
        await generator.getUpdateSchemaSQL();

        await generator.refreshDatabase();
    }

    async create(): Promise<void>
    {
        await this.createInstanceConnection();
    }

    async close(force = true): Promise<void>
    {
        await orm.close(force);
    }

    async drop(): Promise<void>
    {
        const generator = orm.getSchemaGenerator();
        await generator.getDropSchemaSQL();
        await generator.refreshDatabase();
    }

    async synchronize(): Promise<void>
    {
        const generator = orm.getSchemaGenerator(); // this also creates the schema

        /* This isn't necessary, but informative */
        const dropDump = await generator.getDropSchemaSQL();
        Logger.info(dropDump);

        const createDump = await generator.getCreateSchemaSQL();
        Logger.info(createDump);

        const updateDump = await generator.getUpdateSchemaSQL();
        Logger.info(updateDump);

        await generator.refreshDatabase(); // without this, the schema 'll not update
    }
}

export default CreateMikroORMConnection;
