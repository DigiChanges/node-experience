import MainConfig from '../../Config/MainConfig';
import TypeORMCreateConnection from '../Infrastructure/Database/TypeORMCreateConnection';
import MongooseCreateConnection from '../Infrastructure/Database/MongooseCreateConnection';
import MikroORMCreateConnection from '../Infrastructure/Database/MikroORMCreateConnection';
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
            TypeORM: TypeORMCreateConnection,
            Mongoose: MongooseCreateConnection,
            MikroORM: MikroORMCreateConnection
        };

        return new createConnections[this.dbDefault](config);
    }
}

export default DatabaseFactory;
