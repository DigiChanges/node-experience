import INotifierStrategy from '../Shared/INotifierStrategy';
import { injectable } from 'inversify';

@injectable()
class MockStrategy implements INotifierStrategy
{
    public async send()
    {
        return Promise.resolve(true);
    }
}

export default MockStrategy;
