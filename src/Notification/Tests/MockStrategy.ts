import INotifierStrategy from '../Shared/INotifierStrategy';

class MockStrategy implements INotifierStrategy
{
    public async send()
    {
        return Promise.resolve(true);
    }
}

export default MockStrategy;
