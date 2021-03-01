import DatabaseFactory from "./Infrastructure/Factories/DatabaseFactory";
import {validateEnv} from "./Config/validateEnv";

const initCommand = async () =>
{
	validateEnv();

	const databaseFactory = new DatabaseFactory();

	const createConnection = databaseFactory.create();
	createConnection.initConfig();

	await createConnection.create();
}

export default initCommand;
