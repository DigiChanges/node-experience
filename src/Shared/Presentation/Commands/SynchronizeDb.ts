import DatabaseFactory from '../../Factories/DatabaseFactory';
import ICreateConnection from '../../Infrastructure/Database/ICreateConnection';

const synchronize = async() =>
{
    const databaseFactory = new DatabaseFactory();
    const createConnection: ICreateConnection = databaseFactory.create();
    createConnection.initConfig();
    await createConnection.create();
    await createConnection.synchronize();
    await createConnection.close();
};

void (async() =>
{
    await synchronize();
})();
