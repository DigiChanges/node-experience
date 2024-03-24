import qs from 'qs';
import { Server } from 'http';
import Fastify, { FastifyInstance, FastifyPluginCallback } from 'fastify';
import { IApp } from '../Application/IApp';
import { IAppConfig } from '../Application/IAppConfig';

export class AppFastify implements IApp
{
    public port?: number;
    #app: FastifyInstance;

    constructor(config: IAppConfig)
    {
        const envToLogger = {
            development: {
                transport: {
                    target: 'pino-pretty',
                    options: {
                        translateTime: 'HH:MM:ss Z',
                        ignore: 'pid,hostname'
                    }
                }
            },
            production: true,
            test: false
        };

        this.port = config.serverPort || 8090;
        this.#app = Fastify({
            logger: envToLogger[process.env.NODE_ENV] ?? true, // config.env === 'development' || env === 'test' true,
            bodyLimit: 10485760,
            querystringParser: str => qs.parse(str)
        });
    }

    public async addMiddleware<T, K>(middleware: T, options?: K): Promise<void>
    {
        await this.#app.register(middleware as any, options);
    }

    public async addRouter<T>(router: T, options?: unknown): Promise<void>
    {
        await this.#app.register(router as FastifyPluginCallback, options);
    }

    public async setNotFoundHandler<T>(handler: any): Promise<void>
    {
        this.#app.setNotFoundHandler(handler);
    }

    public async setErrorHandler<T>(router: T): Promise<void>
    {
        this.#app.setErrorHandler(router as any);
    }

    public async listen(): Promise<void>
    {
        await this.#app.listen({ port: this.port, host: '0.0.0.0' });
    }

    public async getServer(): Promise<Server | undefined>
    {
        return this.#app.server;
    }

    public async callback(): Promise<any>
    {
        await this.#app.ready();
        return this.#app.server;
    }

    public async close(): Promise<void>
    {
        if (this.#app.server)
        {
            this.#app.server.close();
        }
    }
}
