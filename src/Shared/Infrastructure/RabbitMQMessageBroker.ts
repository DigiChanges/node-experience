import { Connection, Channel, connect } from 'amqplib';

import { IMessageBroker, PublishParams, SubscribeParams, MessageBrokerConfig } from './IMessageBroker';
import { ErrorException } from '../../Main/Domain/Errors/ErrorException';

class RabbitMQMessageBroker implements IMessageBroker
{
    #connection: Connection;
    #channel: Channel;

    async connect(config: MessageBrokerConfig): Promise<void>
    {
        if (!this.#connection)
        {
            this.#connection = await connect(config.uri);
            this.#channel = await this.#connection.createChannel();
        }
    }

    async publish<T>(params: PublishParams<T>): Promise<void>
    {
        if (!this.#channel)
        {
            throw new Error('Channel not initialized. Call connect() first.');
        }

        const { exchange, routingKey, content, queue, options } = params;

        const queueName = queue ?? routingKey;
        const exchangeType = options?.exchangeType ?? 'direct';
        const exchangeOptions = { durable: true, ...params?.options?.exchangeOptions };

        await this.#channel.assertExchange(exchange, exchangeType, exchangeOptions);
        await this.#channel.bindQueue(queueName, exchange, routingKey);
        this.#channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(content)), { persistent: true });
    }

    async subscribe<T>(params: SubscribeParams<T>): Promise<void>
    {
        if (!this.#channel)
        {
            throw new ErrorException({
                message: 'Channel not initialized. Call connect() first.',
                errorCode: 'messageBroker.channel.not.initialized'
            });
        }

        await this.#channel.assertQueue(params.queue, params.queueOptions);
        await this.#channel.consume(params.queue, (msg) =>
        {
            if (msg)
            {
                params.job.execute(JSON.parse(msg.content.toString()))
                    .catch((err) =>
                    {
                        throw new ErrorException({
                            message: `Job ${params.job.name}, ${err.message}`,
                            errorCode: 'messageBroker.job.error'
                        });
                    });
                this.#channel.ack(msg);
            }
        });
    }

    async disconnect(): Promise<void>
    {
        if (this.#channel)
        {
            await this.#channel.close();
        }
        if (this.#connection)
        {
            await this.#connection.close();
        }
    }
}

export default RabbitMQMessageBroker;
