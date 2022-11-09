import EmailStrategy from './EmailStrategy';
import WebPushStrategy from './WebPushStrategy';

class NotifierFactory
{
    static create(strategy: string)
    {
        const notifier: Record<string, any> = {
            EmailStrategy,
            WebPushStrategy
        };

        return new notifier[strategy]();
    }
}

export default NotifierFactory;
