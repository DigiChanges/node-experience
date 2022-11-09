import MainConfig from '../../Config/MainConfig';
import CreateTypeORMConnection from '../Infrastructure/Database/CreateTypeORMConnection';
import CreateMongooseConnection from '../Infrastructure/Database/CreateMongooseConnection';
import CreateMikroORMConnection from '../Infrastructure/Database/CreateMikroORMConnection';
import ICreateConnection from '../Infrastructure/Database/ICreateConnection';

class DatabaseFactory
{
    private readonly dbDefault: string;

    constructor(dbDefault?: string)
    {
        const mainConfig = MainConfig.getInstance();
        this.dbDefault = dbDefault ?? mainConfig.getConfig().dbConfig.default;
    }

    create(): ICreateConnection
    {
        const mainConfig = MainConfig.getInstance();
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
