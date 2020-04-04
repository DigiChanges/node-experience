import express from 'express';
import logger from '../Lib/Logger';

export class LoggerRoutes {
    static log(request: express.Request, response: express.Response, next: any) {
        logger.info(`${request.method} ${request.path}`);
        next();
    }
}