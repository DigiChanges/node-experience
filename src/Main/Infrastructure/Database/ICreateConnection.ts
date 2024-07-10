
abstract class ICreateConnection
{
    abstract create(): Promise<void>;
    abstract close(force?: boolean): Promise<void>;
    abstract drop(): Promise<void>;
    abstract initConfig(): Promise<void>;
    abstract initConfigTest(): Promise<void>;
    abstract synchronize(): Promise<void>;
}

export default ICreateConnection;
