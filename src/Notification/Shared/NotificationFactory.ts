import { injectable } from 'inversify';
import EmailStrategy from './EmailStrategy';
import WebPushStrategy from './WebPushStrategy';
import INotifierStrategy from './INotifierStrategy';
import INotificationFactory from './INotificationFactory';

@injectable()
class NotificationFactory implements INotificationFactory
{
    public create(strategyName = 'email'): INotifierStrategy & any
    {
        const notifiers: Record<string, any>  = {
            email: EmailStrategy,
            webPush: WebPushStrategy
        };

        return new notifiers[strategyName]();
    }
}

export default NotificationFactory;
