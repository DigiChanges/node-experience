import MainConfig from '../../Config/mainConfig';
import TypeORMCreateConnection from '../Database/TypeORMCreateConnection';
import MongooseCreateConnection from '../Database/MongooseCreateConnection';
import { ICreateConnection } from '@digichanges/shared-experience';
import MikroORMCreateConnection from '../Database/MikroORMCreateConnection';

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
