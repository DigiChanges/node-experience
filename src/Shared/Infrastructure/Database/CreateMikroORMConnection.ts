import { MikroORM } from '@mikro-orm/core';
import { newDb } from 'pg-mem';
import Item from '../../../Item/Infrastructure/Schemas/ItemMikroORM';
import File from '../../../File/Infrastructure/Schemas/FileMikroORM';
import FileVersion from '../../../File/Infrastructure/Schemas/FileVersionMikroORM';
import ICreateConnection from './ICreateConnection';
import Logger from '../../Application/Logger/Logger';

export let orm: MikroORM;

class CreateMikroORMConnection implements ICreateConnection
{
    private readonly config: any;
    private createInstanceConnection: any;
    private entities = [
        FileVersion,
        Item,
        File
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
                dbName: this.config.dbName,
                type: this.config.type, // TODO: see docs to change type deprecated attribute
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
        await Logger.info(dropDump);

        const createDump = await generator.getCreateSchemaSQL();
        await Logger.info(createDump);

        const updateDump = await generator.getUpdateSchemaSQL();
        await Logger.info(updateDump);

        await generator.refreshDatabase(); // without this, the schema 'll not update
    }
}

export default CreateMikroORMConnection;
