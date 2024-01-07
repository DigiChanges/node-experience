import MainConfig from '../../../Config/MainConfig';
import CreateMongooseConnection from '../Database/CreateMongooseConnection';
import CreateMikroORMConnection from '../Database/CreateMikroORMConnection';
import ICreateConnection from '../Database/ICreateConnection';

type DbValueProp = typeof CreateMongooseConnection | typeof CreateMikroORMConnection;

class DatabaseFactory
{
    #config = MainConfig.getInstance().getConfig().dbConfig;

    create(_db?: string): ICreateConnection
    {
        const dbDefault = this.#config.default;
        const db = _db ?? dbDefault;

        const strategy = new Map<string, DbValueProp>();
        strategy.set('Mongoose', CreateMongooseConnection);
        strategy.set('MikroORM', CreateMikroORMConnection);

        return new (strategy.get(db))(this.#config[db]);
    }
}

export default DatabaseFactory;
