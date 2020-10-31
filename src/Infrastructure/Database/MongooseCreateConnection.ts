import mongoose from "mongoose";
import Config from "config";
import ICreateConnection from "../../InterfaceAdapters/IDatabase/ICreateConnection";
import IUserDocument from "../../InterfaceAdapters/IEntities/Mongoose/IUserDocument";
import IRoleDocument from "../../InterfaceAdapters/IEntities/Mongoose/IRoleDocument";
import IItemDocument from "../../InterfaceAdapters/IEntities/Mongoose/IItemDocument";
import ItemSchema from "../Schema/Mongoose/Item";
import RoleSchema from "../Schema/Mongoose/Role";
import UserSchema from "../Schema/Mongoose/User";
import FileSchema from "../Schema/Mongoose/File";
import INotificationDocument from "../../InterfaceAdapters/IEntities/Mongoose/INotificationDocument";
import {EmailNotificationSchema, NotificationSchema, PushNotificationSchema} from "../Schema/Mongoose/Notification";
import IFileDocument from "../../InterfaceAdapters/IEntities/Mongoose/IFileDocument";

export let connection: mongoose.Connection = null;

class MongooseCreateConnection implements ICreateConnection
{
    private readonly config: any;

    constructor(config: any)
    {
        this.config = config;
    }

    async create(): Promise<any>
    {
        const config: any = Config.get('dbConfig.Mongoose');
        const uri: string = `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`

        connection = await mongoose.createConnection(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });

        // Domain
        connection.model<IUserDocument>('User', UserSchema);
        connection.model<IRoleDocument>('Role', RoleSchema);
        connection.model<IItemDocument>('Item', ItemSchema);
        connection.model<IFileDocument>('File', FileSchema);

        // Notifications
        const NotificationModel = connection.model<INotificationDocument>('Notification', NotificationSchema);
        NotificationModel.discriminator('EmailNotification', EmailNotificationSchema);
        NotificationModel.discriminator('PushNotification', PushNotificationSchema);

        return connection;
    }
}

export default MongooseCreateConnection;
