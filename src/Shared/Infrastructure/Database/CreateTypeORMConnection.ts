import { DataSource } from 'typeorm';
import { newDb } from 'pg-mem';
import User from '../../../User/Infrastructure/Schemas/UserTypeORM';
import Role from '../../../Role/Infrastructure/Schemas/RoleTypeORM';
import Item from '../../../Item/Infrastructure/Schemas/ItemTypeORM';
import File from '../../../File/Infrastructure/Schemas/FileTypeORM';
import Notification from '../../../Notification/Infrastructure/Schemas/NotificationTypeORM';
import TokenSchema from '../../../Auth/Infrastructure/Schemas/TokenTypeORM';
import ICreateConnection from './ICreateConnection';

export let dataSource: DataSource = null;

class CreateTypeORMConnection implements ICreateConnection
{
    private readonly config: any;
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

    async initConfig(): Promise<DataSource>
    {
        dataSource = new DataSource({ ...this.config, entities: this.entities });
        return dataSource;
    }

    async initConfigTest(uri: string): Promise<void>
    {
        // ==== get a memory db
        const db = newDb({
            autoCreateForeignKeyIndices: true
        });

        db.public.registerFunction({
            implementation: () => 'experience',
            name: 'current_database'
        });

        dataSource = db.adapters.createTypeormDataSource({
            type: 'postgres',
            entities: [...this.entities, TokenSchema]
        });

        await dataSource.synchronize();
    }

    async create(): Promise<any>
    {
        return await dataSource.initialize();
    }

    async close(force = true): Promise<void>
    {
        await dataSource.destroy();
    }

    async synchronize(): Promise<void>
    {
        await dataSource.synchronize(true);
    }

    async drop(): Promise<any>
    {
        return await dataSource.dropDatabase();
    }
}

export default CreateTypeORMConnection;
