import container from '../../../inversify.config';
import InjectionFactory from './InjectionFactory';
import {SERVICES_IDENTIFIER} from '../../../serviceIdentifier';

export default class ContainerFactory
{
    static create<T>(type: string): T
    {
        return container.get<T>(type);
    }
}

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