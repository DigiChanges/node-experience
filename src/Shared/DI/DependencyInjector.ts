import injector from './injector';

class DependencyInjector
{
    static inject<T>(token: any): T
    {
        return injector.get(token) as T;
    }
}

export default DependencyInjector;
