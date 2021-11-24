import { injectable } from 'inversify';
import INotificationFactory from '../Shared/INotificationFactory';
import INotifierStrategy from '../Shared/INotifierStrategy';
import MockStrategy from './MockStrategy';

@injectable()
class MockNotificationFactory implements INotificationFactory
{
    public create(strategyName = 'email'): INotifierStrategy & any
    {
        const notifiers: Record<string, any>  = {
            email: MockStrategy,
            webPush: MockStrategy
        };

        return new notifiers[strategyName]();
    }
}

export default MockNotificationFactory;
