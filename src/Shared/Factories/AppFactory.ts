import IApp from '../Application/Http/IApp';
import AppExpress from '../Application/Http/AppExpress';
import AppKoa from '../Application/Http/AppKoa';

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
