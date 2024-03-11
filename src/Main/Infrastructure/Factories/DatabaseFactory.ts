import { MainConfig } from '../../../Config/MainConfig';
import CreateMongooseConnection from '../Database/CreateMongooseConnection';
import CreateMikroORMConnection from '../Database/CreateMikroORMConnection';
import ICreateConnection from '../Database/ICreateConnection';

type DbValueProp = typeof CreateMongooseConnection | typeof CreateMikroORMConnection;

class DatabaseFactory
{
    create(_db = 'Mongoose'): ICreateConnection
    {
        const env = MainConfig.getEnv();
        const db = env.DB_ORM_DEFAULT;

        const strategy = new Map<string, DbValueProp>();
        strategy.set('Mongoose', CreateMongooseConnection);
        strategy.set('MikroORM', CreateMikroORMConnection);

        const config = {
            uri: env.DB_URI
        };

        return new (strategy.get(db))(config);
    }
}

export default DatabaseFactory;
