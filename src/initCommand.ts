import DatabaseFactory from './Shared/Factories/DatabaseFactory';
import { validateEnv } from './Config/validateEnv';

const initCommand = async() =>
{
    validateEnv();

    const databaseFactory = new DatabaseFactory();

    const createConnection = databaseFactory.create();
    await createConnection.initConfig();

    await createConnection.create();
};

export default initCommand;
