import mongoose from 'mongoose';
import MainConfig from '../../Config/mainConfig';
import { ICreateConnection } from '@digichanges/shared-experience';

import IUserDocument from '../../User/InterfaceAdapters/IUserDocument';
import IRoleDocument from '../../Role/InterfaceAdapters/IRoleDocument';
import IItemDocument from '../../Item/InterfaceAdapters/IItemDocument';
import IFileDocument from '../../File/Infrastructure/Schemas/IFileDocument';
import INotificationDocument from '../../Notification/InterfaceAdapters/INotificationDocument';
import ITokenDocument from '../../Auth/InterfaceAdapters/ITokenDocument';

import ItemSchema from '../../Item/Infrastructure/Schemas/ItemMongoose';

import RoleSchema from '../../Role/Infrastructure/Schemas/RoleMongoose';
import UserSchema from '../../User/Infrastructure/Schemas/UserMongoose';
import FileSchema from '../../File/Infrastructure/Schemas/FileMongoose';
import { EmailNotificationSchema, NotificationSchema, PushNotificationSchema } from '../../Notification/Infrastructure/Schemas/NotificationMongoose';
import TokenSchema from '../../Auth/Infrastructure/Schemas/TokenMongoose';

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
        const config = MainConfig.getInstance().getConfig().dbConfig.Mongoose;
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
