import MainConfig from '../../Config/mainConfig';
import TypeORMCreateConnection from '../Database/TypeORMCreateConnection';
import MongooseCreateConnection from '../Database/MongooseCreateConnection';
import { ICreateConnection } from '@digichanges/shared-experience';

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

        const createConnections: Record<string, ICreateConnection> = {
            TypeORM: new TypeORMCreateConnection(config),
            Mongoose: new MongooseCreateConnection(config)
        };

        return createConnections[this.dbDefault];
    }
}

export default DatabaseFactory;
