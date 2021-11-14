import pino from 'pino';

const Logger = pino({
    name: 'nexp',
    level: 'debug',
    prettyPrint: { colorize: true, levelFirst: true, hideObject: true }
});

export default Logger;
