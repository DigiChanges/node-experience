import IApp from '../Application/Http/IApp';
import AppKoa from '../Application/Http/AppKoa';

class AppFactory
{
    static create(appName = 'AppKoa'): IApp
    {
        const strategy: Record<string, any> = {
            [AppKoa.name]: AppKoa
        };

        return new strategy[appName]();
    }
}

export default AppFactory;
