import {controller, httpPost, request, response, next, httpGet} from "inversify-express-utils";
import { NextFunction, Request, Response } from "express";

import StatusCode from "../Shared/StatusCode";

import AuthorizeMiddleware from "../Middlewares/AuthorizeMiddleware";
import Permissions from "../../../config/Permissions";

import {lazyInject} from "../../inversify.config";
import { TYPES } from '../../types';
import Responder from '../Shared/Responder';
import ListObjectsRequest from '../Requests/Handler/FileSystem/ListObjectsRequest';
import ListFilesUseCase from '../../Domain/UseCases/FileSystem/ListFilesUseCase';
import ListObjectsUseCase from '../../Domain/UseCases/FileSystem/ListObjectsUseCase';
import UploadBase64UseCase from '../../Domain/UseCases/FileSystem/UploadBse64UseCase';
import FileRepRequest from '../Requests/Handler/FileSystem/FileRepRequest';
import DownloadUseCase from '../../Domain/UseCases/FileSystem/DownloadUseCase';
import GetPresignedGetObjectUseCase from '../../Domain/UseCases/FileSystem/GetPresignedGetObjectUseCase';
import UploadMultipartUseCase from '../../Domain/UseCases/FileSystem/UploadMultipartUseCase';
import FileReqMulter from '../Middlewares/FileReqMulter';
import Base64FileRepRequest from '../Requests/Handler/FileSystem/Base64FileRepRequest';
import ValidatorRequest from '../../Application/Shared/ValidatorRequest';
import MultipartFileRepRequest from '../Requests/Handler/FileSystem/MultipartFileRepRequest';
import DownloadPostFileRepRequest from '../Requests/Handler/FileSystem/DownloadPostFileRepRequest';
import FileRequestCriteria from "../Requests/Handler/FileSystem/FileRequestCriteria";

@controller('/api/files')
class FileHandler
{
    @lazyInject(TYPES.Responder)
    private responder: Responder;

    @httpGet('/')
    public async list (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new FileRequestCriteria(req);
        await ValidatorRequest.handle(_request);

        const listFilesUseCase = new ListFilesUseCase();
        const listFiles = await listFilesUseCase.handle(_request);

        this.responder.send( {data: listFiles}, res, StatusCode.HTTP_OK, null );
    }

    @httpGet('/objects')
    public async listFilesystemObjects (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ListObjectsRequest(req);
        await ValidatorRequest.handle(_request);

        const listObjectsUseCase = new ListObjectsUseCase();
        const listObjects = await listObjectsUseCase.handle(_request);

        this.responder.send( {data: listObjects}, res, StatusCode.HTTP_OK, null );
    }

    @httpPost('/base64')
    public async uploadBase64 (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new Base64FileRepRequest(req);
        await ValidatorRequest.handle(_request);

        const uploadBase64UseCase = new UploadBase64UseCase();
        const data = await uploadBase64UseCase.handle(_request);

        this.responder.send({message: "File uploaded", data}, res, StatusCode.HTTP_CREATED , null );
    }

    @httpPost('/', FileReqMulter.single('file'))
    public async uploadMultipart (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new MultipartFileRepRequest(req);
        await ValidatorRequest.handle(_request);

        const uploadMultipartUseCase = new UploadMultipartUseCase();
        const data = await uploadMultipartUseCase.handle(_request);

        this.responder.send({message: "File uploaded", data}, res, StatusCode.HTTP_CREATED , null );
    }

    @httpPost('/presignedGetObject', AuthorizeMiddleware(Permissions.DOWNLOAD_FILE))
    public async getPresignedGetObject (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new DownloadPostFileRepRequest(req);
        await ValidatorRequest.handle(_request);

        const getPresignedGetObjectUseCase = new GetPresignedGetObjectUseCase();
        const presignedGetObject = await getPresignedGetObjectUseCase.handle(_request);

        this.responder.send({presignedGetObject}, res, StatusCode.HTTP_OK, null);
    }

    @httpPost('/download', AuthorizeMiddleware(Permissions.DOWNLOAD_FILE))
    public async download (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new DownloadPostFileRepRequest(req);
        await ValidatorRequest.handle(_request);

        const downloadUseCase = new DownloadUseCase();

        // TODO: Agregar el header correcto mediante la persistencia de los archivos en mongo y guardando su metadata
        res.writeHead(200, {'Content-Type': 'image/jpeg' });

        const stream = await downloadUseCase.handle(_request);

        this.responder.sendStream(stream, res, StatusCode.HTTP_OK);
    }

    @httpGet('/:filename', AuthorizeMiddleware(Permissions.DOWNLOAD_FILE))
    public async downloadStreamFile (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new FileRepRequest(req);
        const downloadUseCase = new DownloadUseCase();

        // TODO: Agregar el header correcto mediante la persistencia de los archivos en mongo y guardando su metadata
        res.writeHead(200, {'Content-Type': 'image/jpeg' });

        const stream = await downloadUseCase.handle(_request);

        this.responder.sendStream(stream, res, StatusCode.HTTP_OK);
    }
}

export default FileHandler;
