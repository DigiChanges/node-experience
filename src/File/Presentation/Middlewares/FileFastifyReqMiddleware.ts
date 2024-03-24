import { FastifyRequest } from 'fastify';
import fs from 'fs';
import util from 'node:util';
import { pipeline } from 'node:stream';
import { stat } from 'fs/promises';
const pump = util.promisify(pipeline);

interface IFileStream
{
    type: string;
    fieldname: string;
    filename: string;
    encoding: string;
    mimetype: string;
    size?: number;
    destination?: string;
    originalname?: string;
    file: unknown;
}

async function writeFile(fileStream: IFileStream)
{
    const { filename, file } = fileStream;
    await pump(file as any, fs.createWriteStream(`/tmp/${filename}`));
    fileStream.size = (await stat(`/tmp/${filename}`)).size;
    fileStream.destination = '/tmp';
    fileStream.originalname = filename;

    return fileStream;
}

async function writeFileHandler(request: any)
{
    const fileStream = await request.file();
    request.file = await writeFile(fileStream);
}

async function writeFilesHandler(request: any)
{
    const parts = request.files();
    const files = [];

    for await (const part of parts)
    {
        files.push(await writeFile(part));
    }

    request.files = files;
}

async function writeFileMiddleware(payload)
{
    return async function(request: FastifyRequest)
    {
        if (payload === 'file')
        {
            await writeFileHandler(request);
        }
        if (payload === 'files')
        {
            await writeFilesHandler(request);
        }
    };
}
export default writeFileMiddleware;
