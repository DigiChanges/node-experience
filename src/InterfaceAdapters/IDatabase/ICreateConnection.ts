
interface ICreateConnection
{
    create(): Promise<any>;
    close(): Promise<any>;
    drop(): Promise<any>;
    initConfig(): any;
    initConfigTest(uri: string): any;
}

export default ICreateConnection;
