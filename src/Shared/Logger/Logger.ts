import fs from 'fs';
import pino  from 'pino';
import pretty from 'pino-pretty';

const prettyPino = pretty({
    colorize: true,
    levelFirst: true,
    hideObject: true
});

const streams = <any>[
    { level: 'debug', stream: prettyPino },
    { level: 'fatal', stream: fs.createWriteStream('./dist/src/logs/fatal.stream.log') },
    { level: 'error', stream: fs.createWriteStream('./dist/src/logs/error.stream.log') },
    { level: 'error', stream: process.stderr }
];

const Logger = pino({
    level: 'debug' // this MUST be set at the lowest level of the destinations
}, pino.multistream(streams));

export default Logger;
