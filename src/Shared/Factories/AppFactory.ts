import IApp from '../../App/InterfaceAdapters/IApp';
import AppExpress from '../../App/Presentation/Shared/Http/AppExpress';
import AppKoa from '../../App/Presentation/Shared/Http/AppKoa';

class AppFactory
{
    static create(appName = 'AppExpress'): IApp
    {
        const strategy: Record<string, any> = {
            [AppExpress.name]: AppExpress,
            [AppKoa.name]: AppKoa
        };

        return new strategy[appName]();
    }
}

export default AppFactory;
