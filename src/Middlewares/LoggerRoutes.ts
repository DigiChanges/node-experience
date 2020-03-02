import express from 'express';

export class LoggerRoutes {
    static log(request: express.Request, response: express.Response, next: any) {
        console.log(`${request.method} ${request.path}`);
        next();
    }
}