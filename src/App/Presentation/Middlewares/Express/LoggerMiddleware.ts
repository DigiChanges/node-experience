import Logger from '../../../../Shared/Logger/Logger';

const LoggerMiddleware = (req: any, res: any, next: any) =>
{
    Logger.debug(`${req.method}: ${req.path} - ${req.ip}`);
    next();
};

export default LoggerMiddleware;
