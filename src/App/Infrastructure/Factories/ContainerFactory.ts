import container from '../../../inversify.config';

class ContainerFactory
{
    static create<T>(type: string): T
    {
        return container.get<T>(type);
    }
}

export default ContainerFactory;
