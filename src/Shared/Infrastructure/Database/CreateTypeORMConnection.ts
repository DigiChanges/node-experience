import { DataSource } from 'typeorm';
import { newDb } from 'pg-mem';
import User from '../../../User/Infrastructure/Schemas/UserTypeORM';
import Role from '../../../Role/Infrastructure/Schemas/RoleTypeORM';
import Item from '../../../Item/Infrastructure/Schemas/ItemTypeORM';
import File from '../../../File/Infrastructure/Schemas/FileTypeORM';
import Notification from '../../../Notification/Infrastructure/Schemas/NotificationTypeORM';
import TokenSchema from '../../../Auth/Infrastructure/Schemas/TokenTypeORM';
import ICreateConnection from './ICreateConnection';

export let connection: DataSource = null;

class CreateTypeORMConnection implements ICreateConnection
{
    private readonly config: any;
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
            connection = new DataSource({ ...this.config, entities: this.entities });
            return connection;
        };
    }

    initConfigTest(uri: string): any
    {
        // ==== get a memory db
        const db = newDb({
            autoCreateForeignKeyIndices: true
        });

        db.public.registerFunction({
            implementation: () => 'experience',
            name: 'current_database'
        });

        this.createInstanceConnection = async() =>
        {
            connection = await db.adapters.createTypeormConnection({
                type: 'postgres',
                entities: [...this.entities, TokenSchema]
            });

            return await connection.synchronize();
        };
    }

    async create(): Promise<any>
    {
        return await this.createInstanceConnection();
    }

    async close(): Promise<any>
    {
        await connection.close();
        return connection;
    }

    async drop(): Promise<any>
    {
        return Promise.resolve(undefined); // TODO: drop
    }
}

export default CreateTypeORMConnection;
