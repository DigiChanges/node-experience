import container from '../../inversify.config';
import {SERVICES_IDENTIFIER} from '../../serviceIdentifier';
import InjectionFactory from '../Factories/InjectionFactory';

export function containerFactory(serviceIdentifier: SERVICES_IDENTIFIER, doCache = true)
{
    return (proto: any, key: string): void =>
    {
        const resolve = () =>
        {
            return container.get(serviceIdentifier);
        };

        InjectionFactory._proxyGetter(proto, key, resolve, doCache);
    };
}
