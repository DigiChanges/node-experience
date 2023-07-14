import KoaBootstrapping from '../Http/KoaBootstrapping';
import { IAppConfig, IApp } from '@digichanges/shared-experience';

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
