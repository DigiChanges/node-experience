import MainConfig from '../../Config/MainConfig';
import MongooseCreateConnection from '../Infrastructure/Database/CreateMongooseConnection';
import ICreateConnection from '../Infrastructure/Database/ICreateConnection';

class DatabaseFactory
{
    private dbDefault: string;

    constructor(dbDefault?: string)
    {
        this.dbDefault = dbDefault;
    }

    create(): ICreateConnection
    {
        const mainConfig = MainConfig.getInstance();

        if (!this.dbDefault)
        {
            this.dbDefault = mainConfig.getConfig().dbConfig.default;
        }

        const dbConfig: any = mainConfig.getConfig().dbConfig;
        const config = dbConfig[this.dbDefault];

        const createConnections: Record<string, any> = {
            Mongoose: MongooseCreateConnection
        };

        return new createConnections[this.dbDefault](config);
    }
}

export default DatabaseFactory;
