import { IMessageBroker, PublishParams, SubscribeParams, MessageBrokerConfig } from '../Infrastructure/IMessageBroker';
import Logger from '../Helpers/Logger';

class MockMessageBroker implements IMessageBroker
{
    async connect(config: MessageBrokerConfig): Promise<void>
    {
        Logger.info('MockMessageBroker Connected');
    }

    async publish<T>(params: PublishParams<T>): Promise<void>
    {
        Logger.info('MockMessageBroker publish');
        Logger.info('MockJob publish');
    }

    async subscribe<T>(params: SubscribeParams<T>): Promise<void>
    {
        Logger.info('MockMessageBroker subscribe');
    }

    async disconnect(): Promise<void>
    {
        Logger.info('MockMessageBroker disconnect');
    }
}

export default MockMessageBroker;
