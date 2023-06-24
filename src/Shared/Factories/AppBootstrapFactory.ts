import KoaBootstrapping from '../Application/Http/KoaBootstrapping';
import IApp from '../Application/Http/IApp';
import IAppConfig from '../Application/Http/IAppConfig';

type TypeAppBootstrap = (config: IAppConfig) => Promise<IApp>;

class AppBootstrapFactory
{
    static create(appBootstrapName = 'KoaBootstrapping'): TypeAppBootstrap
    {
        const strategy = new Map<string, TypeAppBootstrap>();
        strategy.set('KoaBootstrapping', KoaBootstrapping);

        return strategy.get(appBootstrapName);
    }
}

export default AppBootstrapFactory;
