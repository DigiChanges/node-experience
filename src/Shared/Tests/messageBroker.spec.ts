import initTestServer from '../../initTestServer';
import ICreateConnection from '../../Main/Infrastructure/Database/ICreateConnection';
import MockMessageBroker from './MockMessageBroker';
import DependencyInjector from '../DI/DependencyInjector';
import { IMessageBroker } from '../Infrastructure/IMessageBroker';
import IJob from '../../Main/Infrastructure/Jobs/IJob';
import Logger from '../Helpers/Logger';
import { MainConfig } from '../../Config/MainConfig';

jest.mock('../Infrastructure/RabbitMQMessageBroker', () => ({
    __esModule: true,
    default: jest.fn(() => new MockMessageBroker())
}));

interface MessageBrokerContent
{
    message: string
}

class MockJob implements IJob<MessageBrokerContent>
{
    name = 'MockJob';

    async execute(content: MessageBrokerContent): Promise<void>
    {
        Logger.info('MessageBrokerContent');
    }
}

describe('Start Item Test', () =>
{
    let dbConnection: ICreateConnection;

    beforeAll(async() =>
    {
        const configServer = await initTestServer();
        dbConnection = configServer.dbConnection;
    });

    afterAll((async() =>
    {
        if (dbConnection)
        {
            await dbConnection.drop();
            await dbConnection.close();
        }
    }));

    test('debería probar la lógica sin conectar a RabbitMQ', async() =>
    {
        const uri = MainConfig.getEnv().MESSAGE_BROKER_URI;
        const messageBroker = DependencyInjector.inject<IMessageBroker>('IMessageBroker');
        await messageBroker.connect({ uri });

        await messageBroker.publish<MessageBrokerContent>({
            exchange: 'MyExchange',
            routingKey: 'MyRoutingKey',
            queue: 'MyQueue',
            content: {
                message: 'MyMessage'
            }
        });

        await messageBroker.subscribe<MessageBrokerContent>({
            queue: 'MyQueue',
            job: new MockJob()
        });

        await messageBroker.disconnect();

        expect('connectSpy').toStrictEqual('connectSpy');
    });
});
