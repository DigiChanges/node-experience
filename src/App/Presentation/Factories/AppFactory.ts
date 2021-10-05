import IApp from '../../InterfaceAdapters/IApp';
import AppExpress from '../Shared/Express/AppExpress';
import AppKoa from '../Shared/Koa/AppKoa';


class AppFactory
{
    static create(appName = 'AppExpress'): IApp
    {
        const strategy: Record<string, IApp> = {
            AppExpress: new AppExpress(),
            AppKoa: new AppKoa()
        };

        return strategy[appName];
    }
}

export default AppFactory;
