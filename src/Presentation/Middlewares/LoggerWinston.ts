import winston from "winston";
import expressWinston from "express-winston";
import loggerOptions from "../../Config/loggerOptions";

const LoggerWinston = expressWinston.logger({
    transports: [
        new winston.transports.Console(loggerOptions.console)
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.cli()
    ),
    meta: false, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: (req, res) => false // optional: allows to skip some log messages based on request and/or response
});

export default LoggerWinston;
