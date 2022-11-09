import mongoose from 'mongoose';
import MainConfig from '../../../Config/MainConfig';
import { urlAlphabet } from 'nanoid';
import { customAlphabet } from 'nanoid/async';

import UserMongooseDocument from '../../../Auth/Infrastructure/Schemas/UserMongooseDocument';
import RoleMongooseDocument from '../../../Auth/Infrastructure/Schemas/RoleMongooseDocument';
import ItemMongooseDocument from '../../../Item/Infrastructure/Schemas/ItemMongooseDocument';
import FileVersionMongooseDocument from '../../../File/Infrastructure/Schemas/FileVersionMongooseDocument';
import NotificationMongooseDocument from '../../../Notification/Infrastructure/Schemas/NotificationMongooseDocument';
import ITokenMongooseDocument from '../../../Auth/Infrastructure/Schemas/ITokenMongooseDocument';

import ItemSchema from '../../../Item/Infrastructure/Schemas/ItemMongoose';

import RoleSchema from '../../../Auth/Infrastructure/Schemas/RoleMongoose';
import UserSchema from '../../../Auth/Infrastructure/Schemas/UserMongoose';
import FileVersionSchema from '../../../File/Infrastructure/Schemas/FileVersionMongoose';
import {
    EmailNotificationSchema,
    NotificationSchema,
    PushNotificationSchema
} from '../../../Notification/Infrastructure/Schemas/NotificationMongoose';
import TokenSchema from '../../../Auth/Infrastructure/Schemas/TokenMongoose';
import ICreateConnection from './ICreateConnection';
import FileMongooseDocument from '../../../File/Infrastructure/Schemas/FileMongooseDocument';
import FileSchema from '../../../File/Infrastructure/Schemas/FileMongoose';

export let connection: mongoose.Connection | null = null;

class CreateMongooseConnection implements ICreateConnection
{
    private readonly config: any;
    private uri: string;
    private readonly options: any;

    constructor(config: any)
    {
        this.config = config;
        this.uri = '';
        this.options = {
            autoIndex: true
        };
    }

    async initConfig()
    {
        const config = MainConfig.getInstance().getConfig().dbConfig.Mongoose;
        this.uri = `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;

        if (config.ssl)
        {
            this.options['ssl'] = config.ssl;
            this.options['sslValidate'] = config.sslValidate;
            this.options['sslCA'] = config.sslCA;
            this.options['replicaSet'] = config.replicaSet;
            this.uri = `${config.driver}://${config.username}:${config.password}@${config.host}/${config.database}?authSource=admin`;
        }
    }

    async initConfigTest()
    {
        const nanoId = customAlphabet(urlAlphabet, 5);
        const dbName = await nanoId();
        this.uri = `${process.env.MONGO_URL}${dbName}`;
    }

    async create(): Promise<any>
    {
        connection = mongoose.createConnection(this.uri);

        // Domain
        connection.model<UserMongooseDocument>('User', UserSchema);
        connection.model<RoleMongooseDocument>('Role', RoleSchema);
        connection.model<ItemMongooseDocument>('Item', ItemSchema);
        connection.model<FileVersionMongooseDocument>('FileVersion', FileVersionSchema);
        connection.model<FileMongooseDocument>('File', FileSchema);

        // Infrastructure
        const NotificationModel = connection.model<NotificationMongooseDocument>('Notification', NotificationSchema);
        NotificationModel.discriminator('EmailNotification', EmailNotificationSchema);
        NotificationModel.discriminator('PushNotification', PushNotificationSchema);
        connection.model<ITokenMongooseDocument>('Token', TokenSchema);

        return connection;
    }

    async close(force = true): Promise<any>
    {
        if (connection)
        {
            await connection.close(force);
        }
    }

    async synchronize(): Promise<void>
    {
        return Promise.resolve(undefined); // There is no need to synchronize
    }

    async drop(): Promise<any>
    {
        const collections = connection ? await connection.db.collections() : [];

        for (const collection of collections)
        {
            await collection.drop();
        }
    }
}

export default CreateMongooseConnection;
