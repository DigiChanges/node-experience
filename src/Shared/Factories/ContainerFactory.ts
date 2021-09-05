import container from '../../inversify.config';

export default class ContainerFactory
{
    static create<T>(type: string): T
    {
        return container.get<T>(type);
    }
}