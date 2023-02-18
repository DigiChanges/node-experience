import Logger from '../../../Shared/Application/Logger/Logger';

const LoggerExpressMiddleware = (req: any, res: any, next: any) =>
{
    void Logger.info(`${req.method}: ${req.path} - ${req.ip}`);
    next();
};

export default LoggerExpressMiddleware;
