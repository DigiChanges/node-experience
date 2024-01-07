import container from './container';

class DependencyInjector
{
    static inject<T>(token: string): T
    {
        return container.resolve(token);
    }
}

export default DependencyInjector;
