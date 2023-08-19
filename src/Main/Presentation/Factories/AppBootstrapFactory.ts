import KoaBootstrapping from '../Http/KoaBootstrapping';
import { IApp } from '@digichanges/shared-experience';
import IExtendAppConfig from '../Http/IExtendAppConfig';

type TypeAppBootstrap = (config: IExtendAppConfig) => Promise<IApp>;

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
