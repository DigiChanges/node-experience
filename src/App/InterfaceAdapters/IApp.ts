import IAppConfig from './IAppConfig';

interface IApp
{
    initConfig(config: IAppConfig): unknown;
    build(): Promise<void>;
    listen(): unknown;
    callback(): unknown;
    close(): void;
}

export default IApp;
