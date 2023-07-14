import DatabaseFactory from '../../Infrastructure/Factories/DatabaseFactory';
import ICreateConnection from '../../../Shared/Infrastructure/Database/ICreateConnection';

const synchronize = async() =>
{
    const databaseFactory = new DatabaseFactory();
    const createConnection: ICreateConnection = databaseFactory.create();
    await createConnection.initConfig();
    await createConnection.create();
    await createConnection.synchronize();
    await createConnection.close();
};

void (async() =>
{
    await synchronize();
})();
