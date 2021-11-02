import IApp from '../../InterfaceAdapters/IApp';
import AppExpress from '../Shared/Express/AppExpress';
import AppKoa from '../Shared/Koa/AppKoa';
import IAppConfig from '../../InterfaceAdapters/IAppConfig';

type AppName = 'AppExpress' | 'AppKoa';

class AppFactory
{
    static create(appName: AppName = 'AppExpress', config: IAppConfig): IApp
    {
        const strategy = {
            [AppExpress.name]: AppExpress,
            [AppKoa.name]: AppKoa
        };

        return new strategy[appName](config);
    }
}

export default AppFactory;
