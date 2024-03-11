import PinoLogger from 'pino';
import { MainConfig } from '../../Config/MainConfig';

class DgLogger
{
    readonly #logger: PinoLogger.Logger;

    constructor()
    {
        const env = MainConfig.getEnv().NODE_ENV;

        const prettyTransport = {
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
        const transportOptions = env === 'development' || env === 'test' ? prettyTransport : stdoutTransport;
        this.#logger = PinoLogger(transportOptions);
    }

    public trace(...args: unknown[])
    {
        this.#logger.trace(args);
    }

    public debug(...args: unknown[])
    {
        this.#logger.debug(args);
    }

    public info(...args: unknown[])
    {
        this.#logger.info(args);
    }

    public warn(...args: unknown[])
    {
        this.#logger.warn(args);
    }

    public error(...args: unknown[])
    {
        this.#logger.error(args);
    }

    public fatal(...args: unknown[])
    {
        this.#logger.error(args);
    }
}

const Logger = new DgLogger();

export default Logger;
