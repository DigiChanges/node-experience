import koaQs from 'koa-qs';
import { Server } from 'http';

import IApp from './IApp';
import Koa from 'koa';
import IAppConfig from './IAppConfig';
import Router from 'koa-router';

class AppKoa implements IApp
{
    public port?: number;
    private app: Koa;
    private config: IAppConfig;
    private server: Server;

    public initConfig(config: IAppConfig)
    {
        this.port = config.serverPort || 8090;
        this.app = koaQs(new Koa());
        this.config = config;
        this.app.proxy = config.proxy;
    }

    public addMiddleware<T>(middleware: T): void
    {
        this.app.use(middleware as Koa.Middleware);
    }

    public addRouter<T>(router: T): void
    {
        this.app.use((router as Router).routes());
        this.app.use((router as Router).allowedMethods());
    }

    public listen(callback: () => void): Server
    {
        this.server = this.app.listen(this.port, callback);
        return this.server;
    }

    public callback(): any
    {
        return this.app.callback();
    }

    close(): void
    {
        if (this.server)
        {
            this.server.close();
        }
    }
}

export default AppKoa;
