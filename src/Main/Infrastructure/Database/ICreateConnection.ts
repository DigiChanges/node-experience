
interface ICreateConnection
{
    create(): Promise<void>;
    close(force?: boolean): Promise<void>;
    drop(): Promise<void>;
    initConfig(): Promise<void>;
    initConfigTest(): Promise<void>;
    synchronize(): Promise<void>;
}

export default ICreateConnection;
