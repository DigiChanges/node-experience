import {controller, httpPost, request, response, next, httpGet} from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";

import StatusCode from "../Shared/StatusCode";

import ValidatorRules from "../Middlewares/ValidatorRules";
import AuthorizeMiddleware from "../Middlewares/AuthorizeMiddleware";
import Permissions from "../../../config/Permissions";

import * as fs from "fs";

import path from "path";
import {lazyInject} from "../../inversify.config";
import { TYPES } from '../../types';
import Responder from '../Shared/Responder';
import ListObjectsRequest from '../Requests/FileSystem/ListObjectsRequest';
import ListObjectsUseCase from '../../Domain/UseCases/FileSystem/ListObjectsUseCase';
import UploadBase64Request from '../Requests/FileSystem/UploadBase64Request';
import UploadBase64UseCase from '../../Domain/UseCases/FileSystem/UploadBse64UseCase';
import DownloadRequest from '../Requests/FileSystem/DownloadRequest';
import DownloadUseCase from '../../Domain/UseCases/FileSystem/DownloadUseCase';
import GetPresignedGetObjectUseCase from '../../Domain/UseCases/FileSystem/GetPresignedGetObjectUseCase';
import internal from 'stream';
import GetFileSystemWithPathUseCase from '../../Domain/UseCases/FileSystem/GetFileSystemWithPathUseCase';
import { createReadStream } from "fs";

@controller('/api/files')
class FileHandler
{
    @lazyInject(TYPES.Responder)
    private responder: Responder;

    @httpGet('/')
    public async listObjects (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ListObjectsRequest(req);
        const listObjectsUseCase = new ListObjectsUseCase();

        const listObjects = await listObjectsUseCase.handle(_request);

        this.responder.send( {data: listObjects}, res, StatusCode.HTTP_OK, null );
    }

    @httpPost('/uploadBase64')
    public async uploadBase64 (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new UploadBase64Request(req);
        const uploadBase64UseCase = new UploadBase64UseCase();

        const payload = await uploadBase64UseCase.handle(_request);

        this.responder.send({message: "File uploaded", payload}, res, StatusCode.HTTP_CREATED , null );
    }

    @httpPost('/presignedGetObject', ...DownloadRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.DOWNLOAD_FILE))
    public async getPresignedGetObject (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new DownloadRequest(req);
        const getPresignedGetObjectUseCase = new GetPresignedGetObjectUseCase();

        const presignedGetObject = await getPresignedGetObjectUseCase.handle(_request);

        this.responder.send({presignedGetObject}, res, StatusCode.HTTP_OK, null);
    }

    @httpPost('/download', ...DownloadRequest.validate(), ValidatorRules, AuthorizeMiddleware(Permissions.DOWNLOAD_FILE))
    public async download (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new DownloadRequest(req);
        const downloadUseCase = new DownloadUseCase();

        // TODO: Agregar el header correcto mediante la persistencia de los archivos en mongo y guardando su metadata
        res.writeHead(200, {'Content-Type': 'image/jpeg' });

        const stream = await downloadUseCase.handle(_request);

        this.responder.sendStream(stream, res, StatusCode.HTTP_OK);
    }

    @httpPost('/downloadfilesystem')
    public async downloadfilesystem (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new DownloadRequest(req);
        const getFileSystemWithPathUseCase = new GetFileSystemWithPathUseCase();

        const pathFile = await getFileSystemWithPathUseCase.handle(_request);

        // return pathFile;

        // const pathFile = __dirname + '/hola.txt';
        console.log("pathFile", pathFile);
        const readStream = createReadStream(pathFile); 
        readStream.pipe(res);
        readStream.unpipe(res);

        readStream.on('data', (chunk) => { console.log(chunk.toString()); });

        readStream.resume();
    }




//     @httpPost('/download')
//     public download (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
//     {
//         const filename = req.params.filename;
//         // let readableStream: internal.Readable = await filesystem.downloadFile(filename);
//         //
//         // res.attachment(filename);
//         // readableStream.pipe(res);
//         // const minioClient: Client = filesystem.getClient();

//         let dataBuffer: any = [];

//         // const filePath = await filesystem.downloadFile(filename);
//         // const path = await minioClient.fGetObject('experience', req.body.filename, '/tmp/' + req.body.filename);

//        res.setHeader("Content-Type", "text/plain");

//         // let readStream = fs.createReadStream('/tmp/' + filename);
//         //
//         // readStream.on('open', () => {
//         //     // This just pipes the read stream to the response object (which goes to the client)
//         //     readStream.pipe(res);
//         // });
//         // res.setHeader('Content-Type','text/plain');
//         // res.setHeader('Content-disposition', 'attachment; filename=hola.txt');

//         let pathUrl = req.path;

//         console.log('__dirname')
//         console.log(__dirname)
//         console.log(path.join(__dirname, "./hola.txt"))

//         console.log('pathUrl before')
//         console.log(pathUrl)

//         console.log('pathUrl after')
//         console.log(pathUrl)

//         const stream = fs.createReadStream(path.join(__dirname, "./hola.txt"));


//         stream.on('data', (chunk)=>  {
//             // const buffer = Buffer.(chunk)
//             // dataBuffer.push(chunk);
//         });

//         stream.on('end', ()=>  {
//            console.log('dataBuffer');
//            console.log(dataBuffer);
//            const buffer = Buffer.concat(dataBuffer);
//            console.log('buffer.toString()')
//            console.log(buffer.toString())
//            // res.set('Content-Type','text/plain');
//            // res.send(buffer);
//            //  console.log(stream);
//             // stream.pipe(res);
//             res.end()
//         });

//         stream.on('close', ()=>
//         {
//             res.end()
//         });

//         // let through = require('through');

//         stream.setEncoding('UTF8');
//         stream.on('end', () => res.end());
//         // stream.pipe(res);
//         // res.send('hola');

//         console.log("Program Ended");
//     }
}

export default FileHandler;
