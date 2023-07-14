import MainConfig from '../../Config/MainConfig';
import PinoLogger from 'pino';

class DgLogger
{
    private logger;

    constructor()
    {
        const env = MainConfig.getInstance().getConfig().env;

        const prettyTransport = {
            name: 'main',
            level: 'debug',
            transport: {
                target: 'pino-pretty',
                options: {
                    levelFirst: true,
                    translateTime: 'HH:MM:ss.l',
                    ignore: 'pid,hostname',
                    colorize: true
                }
            }
        };

        const stdoutTransport = {
            name: 'main',
            level: 'info'
        };

        const settings = env === 'development' ? prettyTransport : stdoutTransport;

        this.logger = PinoLogger(settings);
    }

    public async trace(...args: unknown[])
    {
        this.logger.trace(...args);
    }

    public async debug(...args: unknown[])
    {
        this.logger.debug(...args);
    }

    public async info(...args: unknown[])
    {
        this.logger.info(...args);
    }

    public async warn(...args: unknown[])
    {
        this.logger.warn(...args);
    }

    public async error(...args: unknown[])
    {
        this.logger.error(...args);
    }

    public async fatal(...args: unknown[])
    {
        this.logger.fatal(...args);
    }
}

const Logger = new DgLogger();

export default Logger;
