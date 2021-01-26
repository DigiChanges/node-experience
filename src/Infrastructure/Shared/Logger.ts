import * as winston from "winston";
import loggerOptions from "../../Config/LoggerOptions";

const transportsFile = [
    new winston.transports.File(loggerOptions.file)
];

const transportsCli = [
    new winston.transports.Console(loggerOptions.console)
];

const exceptionHandlers = [
    new winston.transports.Console(loggerOptions.console),
    new winston.transports.File(loggerOptions.file)
];

export const loggerCli = winston.createLogger({
    levels: winston.config.syslog.levels,
    format: winston.format.cli(),
    exitOnError: false,
    transports: transportsCli,
    exceptionHandlers
});

export const loggerFile = winston.createLogger({
    levels: winston.config.syslog.levels,
    format: winston.format.json(),
    exitOnError: false,
    transports: transportsFile,
    exceptionHandlers
});
