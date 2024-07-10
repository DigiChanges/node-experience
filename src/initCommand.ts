import { MainConfig } from './Config/MainConfig';
import ICreateConnection from './Main/Infrastructure/Database/ICreateConnection';
import DependencyInjector from './Shared/DI/DependencyInjector';

const initCommand = async() =>
{
    MainConfig.getEnv();

    const dbConnection: ICreateConnection = DependencyInjector.inject<ICreateConnection>('ICreateConnection');
    await dbConnection.initConfig();
    await dbConnection.create();
};

export default initCommand;
