import express from 'express';
import logger from '../Lib/Logger';

const LoggerRoutes = (request: express.Request, response: express.Response, next: any) => {
        logger.info(`${request.method} ${request.path}`);
        next();
};

export default LoggerRoutes;