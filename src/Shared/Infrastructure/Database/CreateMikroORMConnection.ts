import { MikroORM } from '@mikro-orm/core';
import { newDb } from 'pg-mem';
import User from '../../../Auth/Infrastructure/Schemas/UserMikroORM';
import Role from '../../../Auth/Infrastructure/Schemas/RoleMikroORM';
import Item from '../../../Item/Infrastructure/Schemas/ItemMikroORM';
import File from '../../../File/Infrastructure/Schemas/FileMikroORM';
import FileVersion from '../../../File/Infrastructure/Schemas/FileVersionMikroORM';
import ICreateConnection from './ICreateConnection';
import Logger from '../../Application/Logger/Logger';
import TokenSchema from '../../../Auth/Infrastructure/Schemas/TokenMikroORM';

export let orm: MikroORM;

class CreateMikroORMConnection implements ICreateConnection
{
    private readonly config: any;
    private createInstanceConnection: any;
    private entities = [
        FileVersion,
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
        const db = newDb();

        orm = await db.adapters.createMikroOrm({
            entities: [...this.entities, TokenSchema]
        });

        const generator = orm.getSchemaGenerator();

        await generator.dropSchema();
        await generator.getCreateSchemaSQL();
        await generator.getUpdateSchemaSQL();

        await generator.refreshDatabase();
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
        const generator = orm.getSchemaGenerator();
        await generator.getDropSchemaSQL();
        return await generator.refreshDatabase();
    }

    async synchronize(): Promise<void>
    {
        const generator = orm.getSchemaGenerator(); // this also creates the schema

        /* This isn't necessary, but informative */
        const dropDump = await generator.getDropSchemaSQL();
        Logger.debug(dropDump);

        const createDump = await generator.getCreateSchemaSQL();
        Logger.debug(createDump);

        const updateDump = await generator.getUpdateSchemaSQL();
        Logger.debug(updateDump);

        await generator.refreshDatabase(); // without this, the schema 'll not update
    }
}

export default CreateMikroORMConnection;
