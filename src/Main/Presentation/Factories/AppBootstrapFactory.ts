import FastifyBootstrapping from '../Http/FastifyBootstrapping';
import { IAppConfig } from '../Application/IAppConfig';

type TypeAppBootstrap = (config: IAppConfig) => Promise<any>;

class AppBootstrapFactory
{
    static create(appBootstrapName = 'FastifyBootstrapping'): TypeAppBootstrap
    {
        const strategy = new Map<string, TypeAppBootstrap>();
        strategy.set('FastifyBootstrapping', FastifyBootstrapping);

        return strategy.get(appBootstrapName);
    }
}

export default AppBootstrapFactory;
