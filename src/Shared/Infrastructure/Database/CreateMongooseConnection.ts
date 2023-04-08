import { connect, connection } from 'mongoose';
import MainConfig from '../../../Config/MainConfig';
import { urlAlphabet } from 'nanoid';
import { customAlphabet } from 'nanoid/async';

import ItemSchema, { ItemMongooseDocument } from '../../../Item/Infrastructure/Schemas/ItemMongoose';

import FileVersionSchema, {
    FileVersionMongooseDocument
} from '../../../File/Infrastructure/Schemas/FileVersionMongoose';
import {
    EmailNotificationSchema, NotificationMongooseDocument,
    NotificationSchema,
    PushNotificationSchema
} from '../../../Notification/Infrastructure/Schemas/NotificationMongoose';
import ICreateConnection from './ICreateConnection';
import FileSchema, { FileMongooseDocument } from '../../../File/Infrastructure/Schemas/FileMongoose';

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

    async initConfig(): Promise<void>
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

    async initConfigTest(): Promise<void>
    {
        const nanoId = customAlphabet(urlAlphabet, 5);
        const dbName = await nanoId();
        this.uri = `${process.env.MONGO_URL}${dbName}`;
    }

    async create(): Promise<void>
    {
        await connect(this.uri);

        // Domain
        connection.model<ItemMongooseDocument>('Item', ItemSchema);
        connection.model<FileVersionMongooseDocument>('FileVersion', FileVersionSchema);
        connection.model<FileMongooseDocument>('File', FileSchema);

        // Infrastructure
        const NotificationModel = connection.model<NotificationMongooseDocument>('Notification', NotificationSchema);
        NotificationModel.discriminator('EmailNotification', EmailNotificationSchema);
        NotificationModel.discriminator('PushNotification', PushNotificationSchema);
    }

    async close(force = true): Promise<any>
    {
        await connection.close(force);
    }

    async synchronize(): Promise<void>
    {
        return Promise.resolve(undefined); // There is no need to synchronize
    }

    async drop(): Promise<void>
    {
        const collections = connection ? await connection.db.collections() : [];

        for (const collection of collections)
        {
            await collection.drop();
        }
    }
}

export default CreateMongooseConnection;
