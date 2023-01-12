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

    create(db?: string): ICreateConnection
    {
        const _db = db ?? this.dbDefault;
        const mainConfig = MainConfig.getInstance();
        const dbConfig: any = mainConfig.getConfig().dbConfig;
        const config = dbConfig[_db];

        const createConnections: Record<string, any> = {
            TypeORM: CreateTypeORMConnection,
            Mongoose: CreateMongooseConnection,
            MikroORM: CreateMikroORMConnection
        };

        return new createConnections[_db](config);
    }
}

export default DatabaseFactory;
