import IApp from '../../InterfaceAdapters/IApp';
import AppExpress from '../Shared/Express/AppExpress';
import AppKoa from '../Shared/Koa/AppKoa';
import IAppConfig from '../../InterfaceAdapters/IAppConfig';


class AppFactory
{
    static create(appName = 'AppExpress', config: IAppConfig): IApp
    {
        const strategy: Record<string, IApp> = {
            AppExpress: new AppExpress(config),
            AppKoa: new AppKoa()
        };

        return strategy[appName];
    }
}

export default AppFactory;
