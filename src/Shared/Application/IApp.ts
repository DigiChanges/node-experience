import IAppConfig from './IAppConfig';
import { Server } from 'http';

interface IApp
{
    addMiddleware<T>(middleware: T): void;
    addRouter<T>(router: T): void
    callback(): unknown;
    close(): void;
    initConfig(config: IAppConfig): unknown;
    listen(callback: () => void): Server;
}

export default IApp;
