import {createConnection} from "typeorm";
import ICreateConnection from "../../InterfaceAdapters/IDatabase/ICreateConnection";

class TypeORMCreateConnection implements ICreateConnection
{
    private readonly config: any;

    constructor(config: any)
    {
        this.config = config;
    }

    initConfig(): any
    {
        // TODO: Init config
    }

    initConfigTest(uri: string): any
    {
        // TODO: Init config Test
    }

    async create(): Promise<any>
    {
        return await createConnection({...this.config});
    }

    close(): Promise<any>
    {
        return Promise.resolve(undefined); // TODO: close
    }

    async drop(): Promise<any>
    {
        return Promise.resolve(undefined); // TODO: drop
    }
}

export default TypeORMCreateConnection;
