import ICreateConnection from '../Database/ICreateConnection';

class SyncDbUseCase
{
    constructor(private dbConnection: ICreateConnection)
    {}

    async handle(): Promise<void>
    {
        await this.dbConnection.initConfig();
        await this.dbConnection.create();
        await this.dbConnection.synchronize();
        await this.dbConnection.close();
    }
}

export default SyncDbUseCase;
