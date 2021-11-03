import { createConnection } from 'typeorm';
import { ICreateConnection } from '@digichanges/shared-experience';
import User from '../../User/Infrastructure/Schema/UserTypeORM';
import Role from '../../Role/Infrastructure/Schema/RoleTypeORM';
import Item from '../../Item/Infrastructure/Schema/ItemTypeORM';
import File from '../../File/Infrastructure/Schema/FileTypeORM';
import Notification from '../../Notification/Infrastructure/Schema/NotificationTypeORM';


class TypeORMCreateConnection implements ICreateConnection
{
    private readonly config: any;

    constructor(config: any)
    {
        this.config = config;
    }

    initConfig(): any
    {
        // TODO: Init config
    }

    initConfigTest(uri: string): any
    {
        // TODO: Init config Test
    }

    async create(): Promise<any>
    {
        const entities = [
            User,
            Role,
            Item,
            File,
            Notification
        ];

        return await createConnection({ ...this.config, entities });
    }

    close(): Promise<any>
    {
        return Promise.resolve(undefined); // TODO: close
    }

    async drop(): Promise<any>
    {
        return Promise.resolve(undefined); // TODO: drop
    }
}

export default TypeORMCreateConnection;
