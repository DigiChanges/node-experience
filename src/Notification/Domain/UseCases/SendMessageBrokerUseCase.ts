import DependencyInjector from '../../../Shared/DI/DependencyInjector';
import { IMessageBroker } from '../../../Shared/Infrastructure/IMessageBroker';

class SendMessageBrokerUseCase
{
    async handle()
    {
        const messageBroker = DependencyInjector.inject<IMessageBroker>('IMessageBroker');

        const exchange = 'notificationExchange';
        const routingKey = 'email';
        const queue = routingKey;

        await messageBroker.publish<{ email: string }>({
            exchange,
            routingKey,
            queue,
            content: {
                email: 'user@example.com'
            }
        });
    }
}

export default SendMessageBrokerUseCase;
