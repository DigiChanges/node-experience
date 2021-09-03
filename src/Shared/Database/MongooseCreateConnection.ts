import mongoose from 'mongoose';
import Config from 'config';
import {ICreateConnection} from '@digichanges/shared-experience';

import IUserDocument from '../../User/InterfaceAdapters/IUserDocument';
import IRoleDocument from '../../Role/InterfaceAdapters/IRoleDocument';
import IItemDocument from '../../Item/InterfaceAdapters/IItemDocument';
import IFileDocument from '../../File/InterfaceAdapters/IFileDocument';
import INotificationDocument from '../../Notification/InterfaceAdapters/INotificationDocument';
import ITokenDocument from '../../Auth/InterfaceAdapters/ITokenDocument';

import ItemSchema from '../../Item/Infrastructure/Schema/ItemMongoose';

import RoleSchema from '../../Role/Infrastructure/Schema/RoleMongoose';
import UserSchema from '../../User/Infrastructure/Schema/UserMongoose';
import FileSchema from '../../File/Infrastructure/Schema/FileMongoose';
import {EmailNotificationSchema, NotificationSchema, PushNotificationSchema} from '../../Notification/Infrastructure/Schema/NotificationMongoose';
import TokenSchema from '../../Auth/Infrastructure/Schema/TokenMongoose';

export let connection: mongoose.Connection = null;

class MongooseCreateConnection implements ICreateConnection
{
    private readonly config: any;
    private uri: string;

    constructor(config: any)
    {
        this.config = config;
        this.uri = '';
    }

    async initConfig()
    {
        const config: any = Config.get('dbConfig.Mongoose');
        this.uri = `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;
    }

    async initConfigTest(uri: string)
    {
        this.uri = uri;
    }

    async create(): Promise<any>
    {
        connection = mongoose.createConnection(this.uri);

        // Domain
        connection.model<IUserDocument>('User', UserSchema);
        connection.model<IRoleDocument>('Role', RoleSchema);
        connection.model<IItemDocument>('Item', ItemSchema);
        connection.model<IFileDocument>('File', FileSchema);

        // Infrastructure
        const NotificationModel = connection.model<INotificationDocument>('Notification', NotificationSchema);
        NotificationModel.discriminator('EmailNotification', EmailNotificationSchema);
        NotificationModel.discriminator('PushNotification', PushNotificationSchema);
        connection.model<ITokenDocument>('Token', TokenSchema);

        return connection;
    }

    async close(): Promise<any>
    {
        await connection.close(true);
    }

    async drop(): Promise<any>
    {
        const collections = await connection.db.collections();

        for (const collection of collections)
        {
            await collection.drop();
        }
    }
}

export default MongooseCreateConnection;
