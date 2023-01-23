import IApp from '../Application/Http/IApp';
import AppExpress from '../Application/Http/AppExpress';
import AppKoa from '../Application/Http/AppKoa';

type AppValueProp = typeof AppExpress | typeof AppKoa;

class AppFactory
{
    static create(appName = 'AppExpress'): IApp
    {
        const strategy = new Map<string, AppValueProp>();
        strategy.set(AppExpress.name, AppExpress);
        strategy.set(AppKoa.name, AppKoa);

        return new (strategy.get(appName))();
    }
}

export default AppFactory;
