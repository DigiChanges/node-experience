import KoaBootstrapping from '../Http/KoaBootstrapping';
import IApp from '../../../Shared/Application/IApp';
import IAppConfig from '../../../Shared/Application/IAppConfig';

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
