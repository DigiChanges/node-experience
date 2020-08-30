import {controller, httpPost, request, response, next, httpGet} from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";

import StatusCode from "../Shared/StatusCode";

import ValidatorRules from "../Middlewares/ValidatorRules";
import AuthorizeMiddleware from "../Middlewares/AuthorizeMiddleware";
import Permissions from "../../../config/Permissions";

import AuthRequest from "../Requests/Auth/AuthRequest";
import KeepAliveRequest from "../Requests/Auth/KeepAliveRequest";
import AuthTransformer from "../Transformers/Auth/AuthTransformer";

import LoginUseCase from "../../Domain/UseCases/Auth/LoginUseCase";
import KeepAliveUseCase from "../../Domain/UseCases/Auth/KeepAliveUseCase";
import {filesystem} from "../../index";
import internal from "stream";
import {Client} from "minio";
import * as fs from "fs";

import path from "path";
import { write } from "fs";
import {lazyInject} from "../../inversify.config";
import { TYPES } from '../../types';
import Responder from '../Shared/Responder';

@controller('/api/files')
class FileHandler
{
    @lazyInject(TYPES.Responder)
    private responder: Responder;

    @httpPost('/uploadBase64')
    public async uploadBase64 (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        // Agregar posible ruta del archivo
        const filename = req.body.data?.filename; // cambiar por uuid
        const fileExtension = filename.split(".").pop(); // guardar filename y extension
        const mimeTypeKey = Object.keys(req.body?.base64);
        if (Array.isArray( mimeTypeKey ) && mimeTypeKey.length > 0)
        {
            const buffer = req.body.base64[mimeTypeKey[0]];
            await filesystem.uploadFileByBuffer(filename, buffer);

            this.responder.send({message: "File uploaded"}, res, StatusCode.HTTP_CREATED , null );
        }

        this.responder.send({message: "File not included"}, res, StatusCode.HTTP_PAYMENT_REQUIRED , null );
        // const _request = new AuthRequest(req);
        // const loginUseCase = new LoginUseCase();
        //
        // const payload = await loginUseCase.handle(_request);
        //
        // this.responder.send(payload, res, StatusCode.HTTP_CREATED, new AuthTransformer());
    }

    @httpPost('/download')
    public download (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const filename = req.params.filename;
        // let readableStream: internal.Readable = await filesystem.downloadFile(filename);
        //
        // res.attachment(filename);
        // readableStream.pipe(res);
        // const minioClient: Client = filesystem.getClient();

        let dataBuffer: any = [];

        // const filePath = await filesystem.downloadFile(filename);
        // const path = await minioClient.fGetObject('experience', req.body.filename, '/tmp/' + req.body.filename);

       res.setHeader("Content-Type", "text/plain");

        // let readStream = fs.createReadStream('/tmp/' + filename);
        //
        // readStream.on('open', () => {
        //     // This just pipes the read stream to the response object (which goes to the client)
        //     readStream.pipe(res);
        // });
        // res.setHeader('Content-Type','text/plain');
        // res.setHeader('Content-disposition', 'attachment; filename=hola.txt');

        let pathUrl = req.path;

        console.log('__dirname')
        console.log(__dirname)
        console.log(path.join(__dirname, "./hola.txt"))

        console.log('pathUrl before')
        console.log(pathUrl)

        console.log('pathUrl after')
        console.log(pathUrl)

        const stream = fs.createReadStream(path.join(__dirname, "./hola.txt"));


        stream.on('data', (chunk)=>  {
            // const buffer = Buffer.(chunk)
            // dataBuffer.push(chunk);
        });

        stream.on('end', ()=>  {
           console.log('dataBuffer');
           console.log(dataBuffer);
           const buffer = Buffer.concat(dataBuffer);
           console.log('buffer.toString()')
           console.log(buffer.toString())
           // res.set('Content-Type','text/plain');
           // res.send(buffer);
           //  console.log(stream);
            // stream.pipe(res);
            res.end()
        });

        stream.on('close', ()=>
        {
            res.end()
        });

        // let through = require('through');

        stream.setEncoding('UTF8');
        stream.on('end', () => res.end());
        // stream.pipe(res);
        // res.send('hola');

        console.log("Program Ended");
    }
}

export default FileHandler;
