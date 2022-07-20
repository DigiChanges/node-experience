import IApp from '../../App/InterfaceAdapters/IApp';
import AppExpress from '../../App/Presentation/Shared/Http/Express/AppExpress';
import AppKoa from '../../App/Presentation/Shared/Http/Koa/AppKoa';
import IAppConfig from '../../App/InterfaceAdapters/IAppConfig';

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
