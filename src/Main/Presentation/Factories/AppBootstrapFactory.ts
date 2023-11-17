import IExtendAppConfig from '../Http/IExtendAppConfig';
import FastifyBootstrapping from '../Http/FastifyBootstrapping';

type TypeAppBootstrap = (config: IExtendAppConfig) => Promise<any>;

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
