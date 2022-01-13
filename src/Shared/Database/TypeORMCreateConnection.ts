import { Connection, createConnection } from 'typeorm';
import { newDb } from 'pg-mem';
import { ICreateConnection } from '@digichanges/shared-experience';
import User from '../../User/Infrastructure/Schemas/UserTypeORM';
import Role from '../../Role/Infrastructure/Schemas/RoleTypeORM';
import Item from '../../Item/Infrastructure/Schemas/ItemTypeORM';
import File from '../../File/Infrastructure/Schemas/FileTypeORM';
import Notification from '../../Notification/Infrastructure/Schemas/NotificationTypeORM';
import TokenSchema from '../../Auth/Infrastructure/Schemas/TokenTypeORM';

class TypeORMCreateConnection implements ICreateConnection
{
    private readonly config: any;
    private connection: Connection;
    private createInstanceConnection: any;
    private entities = [
        File,
        Notification,
        Role,
        User,
        Item
    ];

    constructor(config: any)
    {
        this.config = config;
    }

    initConfig(): any
    {
        this.createInstanceConnection = async() =>
        {
            this.connection = await createConnection({ ...this.config, entities: this.entities });
            return this.connection;
        };
    }

    initConfigTest(uri: string): any
    {
        // ==== create a memory db
        const db = newDb({
            autoCreateForeignKeyIndices: true
        });

        db.public.registerFunction({
            implementation: () => 'experience',
            name: 'current_database'
        });

        this.createInstanceConnection = async() =>
        {
            this.connection = await db.adapters.createTypeormConnection({
                type: 'postgres',
                entities: [...this.entities, TokenSchema]
            });

            return await this.connection.synchronize();
        };
    }

    async create(): Promise<any>
    {
        return await this.createInstanceConnection();
    }

    async close(): Promise<any>
    {
        await this.connection.close();
        return this.connection;
    }

    async drop(): Promise<any>
    {
        return Promise.resolve(undefined); // TODO: drop
    }
}

export default TypeORMCreateConnection;
