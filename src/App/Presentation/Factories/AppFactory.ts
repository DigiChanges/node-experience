import IApp from '../../InterfaceAdapters/IApp';
import AppExpress from '../Shared/Express/AppExpress';
import AppKoa from '../Shared/Koa/AppKoa';
import IAppConfig from '../../InterfaceAdapters/IAppConfig';

class AppFactory
{
    static create(appName = 'AppExpress', config: IAppConfig): IApp
    {
        const strategy: Record<string, any> = {
            [AppExpress.name]: AppExpress,
            [AppKoa.name]: AppKoa
        };

        return new strategy[appName](config);
    }
}

export default AppFactory;
