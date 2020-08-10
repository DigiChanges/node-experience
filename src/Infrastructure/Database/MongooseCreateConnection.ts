import ICreateConnection from "../../InterfaceAdapters/IDatabase/ICreateConnection";
import mongoose from "mongoose";

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
        connection = await mongoose.createConnection(`mongodb://experience:experience@db:27017/experience`, { useNewUrlParser: true, useUnifiedTopology: true });

        return connection;
    }
}

export default MongooseCreateConnection;