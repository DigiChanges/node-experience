import ICreateConnection from '../Database/ICreateConnection';
import container from '../../../Shared/DI/container';
import { FACTORIES } from '../../../Shared/DI/Injects';

class SyncDbUseCase
{
    #databaseFactory: any;

    constructor()
    {
        this.#databaseFactory = container.resolve(FACTORIES.IDatabaseFactory);
    }

    async handle(): Promise<void>
    {
        const createConnection = this.#databaseFactory.create() as ICreateConnection;
        await createConnection.initConfig();
        await createConnection.create();
        await createConnection.synchronize();
        await createConnection.close();
    }
}

export default SyncDbUseCase;
