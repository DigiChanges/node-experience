
interface ICreateConnection
{
    create(): Promise<any>;
    close(force?: boolean): Promise<any>;
    drop(): Promise<any>;
    initConfig(): Promise<any>;
    initConfigTest(uri: string): Promise<void>;
    synchronize(): Promise<void>;
}

export default ICreateConnection;
