
export interface ICacheDataAccess
{
    set(key: string, value: string, expires?: number | null): Promise<void>;
    jset(key: string, value: any, expires?: number | null): Promise<unknown>;
    jget(key: string): Promise<any>
    get(key: unknown): Promise<string | number | null>;
    hset(key: string, value: unknown): Promise<unknown>;
    hget(key: string, field: string | null): Promise<unknown>;
    cleanAll(): Promise<unknown>;
    close(): void;
}

export default ICacheDataAccess;
