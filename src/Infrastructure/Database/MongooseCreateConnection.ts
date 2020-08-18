import mongoose from "mongoose";
import Config from "config";
import ICreateConnection from "../../InterfaceAdapters/IDatabase/ICreateConnection";
import IUserDocument from "../../InterfaceAdapters/IEntities/Mongoose/IUserDocument";
import IRoleDocument from "../../InterfaceAdapters/IEntities/Mongoose/IRoleDocument";
import IItemDocument from "../../InterfaceAdapters/IEntities/Mongoose/IItemDocument";
import ItemSchema from "../Schema/Item";
import RoleSchema from "../Schema/Role";
import UserSchema from "../Schema/User";

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

        await connection.model<IUserDocument>('User', UserSchema);
        await connection.model<IRoleDocument>('Role', RoleSchema);
        await connection.model<IItemDocument>('Item', ItemSchema);

        return connection;
    }
}

export default MongooseCreateConnection;