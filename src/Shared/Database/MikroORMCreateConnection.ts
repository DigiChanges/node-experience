import { MikroORM } from '@mikro-orm/core';
import { ICreateConnection } from '@digichanges/shared-experience';
import User from '../../User/Infrastructure/Schemas/UserMikroORM';
import Role from '../../Role/Infrastructure/Schemas/RoleMikroORM';
import Item from '../../Item/Infrastructure/Schemas/ItemMikroORM';
import File from '../../File/Infrastructure/Schemas/FileMikroORM';
// import Notification from '../../Notification/Infrastructure/Schemas/NotificationMikroORM';
// import TokenSchema from '../../AuthHelper/Infrastructure/Schemas/TokenMikroORM';

export let orm: MikroORM = null;

class MikroORMCreateConnection implements ICreateConnection
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

    initConfigTest(uri: string): any
    {
        return Promise.resolve(undefined); // TODO: Set init config
    }

    async create(): Promise<any>
    {
        return await this.createInstanceConnection();
    }

    async close(): Promise<void>
    {
        await orm.close();
    }

    async drop(): Promise<any>
    {
        return Promise.resolve(undefined); // TODO: drop
    }
}

export default MikroORMCreateConnection;
