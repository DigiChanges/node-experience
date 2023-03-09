import IApp from '../Application/Http/IApp';
import AppKoa from '../Application/Http/AppKoa';

type AppValueProp = typeof AppKoa;

class AppFactory
{
    static create(appName = 'AppExpress'): IApp
    {
        const strategy = new Map<string, AppValueProp>();
        strategy.set(AppKoa.name, AppKoa);

        return new (strategy.get(appName))();
    }
}

export default AppFactory;
