import {createConnection, getConnection} from "typeorm";
import ICreateConnection from "../../InterfaceAdapters/IDatabase/ICreateConnection";

class TypeORMCreateConnection implements ICreateConnection
{
    private readonly config: any;

    constructor(config: any)
    {
        this.config = config;
    }

    async create(): Promise<any>
    {
        return await createConnection({...this.config});
    }
}

export default TypeORMCreateConnection;
