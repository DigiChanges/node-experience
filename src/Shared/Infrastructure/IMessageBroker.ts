import IJob from '../../Main/Infrastructure/Jobs/IJob';

export type MessageBrokerConfig = {
    uri: string
}

export interface PublishParams<T>
{
    exchange: string;
    routingKey: string;
    content: T;
    queue?: string;
    options?: {
        exchangeType?: string,
        exchangeOptions?: {
            durable?: boolean;
            internal?: boolean;
            autoDelete?: boolean;
            alternateExchange?: string;
            arguments?: Record<string, string | number | boolean>;
        }
    }
}

export interface SubscribeParams<T>
{
    queue: string;
    job: IJob<T>;
    queueOptions?: {
        exclusive?: boolean;
        durable?: boolean;
        autoDelete?: boolean;
        arguments?: unknown;
        messageTtl?: number;
        expires?: number;
        deadLetterExchange?: string;
        deadLetterRoutingKey?: string;
        maxLength?: number;
        maxPriority?: number;
    }
}

export interface IMessageBroker
{
    connect(config: MessageBrokerConfig): Promise<void>;
    publish<T>(params: PublishParams<T>): Promise<void>;
    subscribe<T>(params: SubscribeParams<T>): Promise<void>;
    disconnect(): Promise<void>;
}
