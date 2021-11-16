import fs from 'fs';
import pino from 'pino';
import pretty from 'pino-pretty';

const prettyPino = pretty({
    colorize: true,
    levelFirst: true,
    hideObject: true
});

const streams = [
    { level: 'debug', stream: prettyPino },
    { level: 'fatal', stream: fs.createWriteStream(`${process.cwd()}/dist/logs/fatal.stream.log`) },
    { level: 'error', stream: fs.createWriteStream(`${process.cwd()}/dist/logs/error.stream.log`) },
    { level: 'error', stream: process.stderr }
];

const Logger = pino({
    level: 'debug' // this MUST be set at the lowest level of the destinations
// @ts-ignore
}, pino.multistream(streams));

export default Logger;
