
interface ICacheRepository {
    createConnection(config: any): any;
    set(key: string, value: string, expires?: number | null): Promise<any>;
    jset(key: string, value: any, expires?: number | null): Promise<any>;
    jget(key: string): Promise<any>
    get(key: any): Promise<string | number>;
    hset(key: string, value: {}): Promise<any>;
    hget(key: string, field: string | null): Promise<{}>;
    cleanAll(): Promise<any>;
}

export default ICacheRepository;
