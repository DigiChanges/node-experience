import DatabaseFactory from './Main/Infrastructure/Factories/DatabaseFactory';
import { MainConfig } from './Config/MainConfig';

const initCommand = async() =>
{
    MainConfig.getEnv();

    const databaseFactory = new DatabaseFactory();

    const createConnection = databaseFactory.create();
    await createConnection.initConfig();

    await createConnection.create();
};

export default initCommand;
