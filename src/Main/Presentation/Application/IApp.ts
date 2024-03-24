import { Server } from 'http';

export interface IApp
{
    addMiddleware<T, K>(middleware: T, options?: K): Promise<void>;
    setErrorHandler(plugin: any): Promise<any>;
    setNotFoundHandler(plugin: any): Promise<any>;
    addRouter<T>(router: T, options?: unknown): Promise<void>
    callback(): Promise<unknown>;
    close(): Promise<void>;
    listen(callback?: () => void): Promise<void>;
    getServer(): Promise<Server | undefined>;
}
