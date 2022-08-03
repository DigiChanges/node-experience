import MainConfig from '../../Config/MainConfig';
import CreateTypeORMConnection from '../Infrastructure/Database/CreateTypeORMConnection';
import CreateMongooseConnection from '../Infrastructure/Database/CreateMongooseConnection';
import CreateMikroORMConnection from '../Infrastructure/Database/CreateMikroORMConnection';
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
            TypeORM: CreateTypeORMConnection,
            Mongoose: CreateMongooseConnection,
            MikroORM: CreateMikroORMConnection
        };

        return new createConnections[this.dbDefault](config);
    }
}

export default DatabaseFactory;
