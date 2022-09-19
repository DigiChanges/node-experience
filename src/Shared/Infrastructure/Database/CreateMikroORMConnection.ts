import { MikroORM } from '@mikro-orm/core';
import User from '../../../User/Infrastructure/Schemas/UserMikroORM';
import Role from '../../../Role/Infrastructure/Schemas/RoleMikroORM';
import Item from '../../../Item/Infrastructure/Schemas/ItemMikroORM';
import File from '../../../File/Infrastructure/Schemas/FileMikroORM';
import ICreateConnection from './ICreateConnection';
import Logger from '../../Application/Logger/Logger';
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

    async initConfigTest(): Promise<any>
    {
        return Promise.resolve(undefined); // TODO: Set init config
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
