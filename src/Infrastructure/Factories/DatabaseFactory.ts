import Config from "config";
import ICreateConnection from "../../InterfaceAdapters/IDatabase/ICreateConnection";
import TypeORMCreateConnection from "../Database/TypeORMCreateConnection";

class DatabaseFactory
{
    private dbDefault: string;

    constructor(dbDefault?: string)
    {
        this.dbDefault = dbDefault
    }

    create(): ICreateConnection
    {
        let createConnection = null;

        if (!this.dbDefault)
        {
           this.dbDefault = Config.get('dbConfig.default');
        }

        const config = Config.get('dbConfig.' + this.dbDefault);

        if (this.dbDefault === 'TypeORM')
        {
            createConnection = new TypeORMCreateConnection(config);
        }

        return createConnection;
    }
}

export default DatabaseFactory;