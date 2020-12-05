import {controller, httpPost, request, response, next, httpGet, httpPut} from "inversify-express-utils";
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
import DownloadUseCase from '../../Domain/UseCases/FileSystem/DownloadUseCase';
import GetPresignedGetObjectUseCase from '../../Domain/UseCases/FileSystem/GetPresignedGetObjectUseCase';
import UploadMultipartUseCase from '../../Domain/UseCases/FileSystem/UploadMultipartUseCase';
import FileReqMulter from '../Middlewares/FileReqMulter';
import FileBase64RepRequest from '../Requests/Handler/FileSystem/FileBase64RepRequest';
import ValidatorRequest from '../../Application/Shared/ValidatorRequest';
import FileMultipartRepRequest from '../Requests/Handler/FileSystem/FileMultipartRepRequest';
import PresignedFileRepRequest from '../Requests/Handler/FileSystem/PresignedFileRepRequest';
import FileRequestCriteria from '../Requests/Handler/FileSystem/FileRequestCriteria';
import FileTransformer from '../Transformers/Files/FileTransformer';
import IPaginator from '../../InterfaceAdapters/Shared/IPaginator';
import IdRequest from '../Requests/Handler/Defaults/IdRequest';
import FileUpdateMultipartRequest from "../Requests/Handler/FileSystem/FileUpdateMultipartRequest";
import UpdateFileMultipartUseCase from "../../Domain/UseCases/FileSystem/UpdateFileMultipartUseCase";
import FileUpdateBase64Request from "../Requests/Handler/FileSystem/FileUpdateBase64Request";
import UpdateFileBase64UseCase from "../../Domain/UseCases/FileSystem/UpdateFileBase64UseCase";
import ObjectTransformer from "../Transformers/Files/ObjectTransformer";

@controller('/api/files')
class FileHandler
{
    @lazyInject(TYPES.Responder)
    private responder: Responder;

    @httpGet('/', AuthorizeMiddleware(Permissions.FILES_LIST))
    public async list (@request() req: Request, @response() res: Response)
    {
        const _request = new FileRequestCriteria(req);
        await ValidatorRequest.handle(_request);

        const listFilesUseCase = new ListFilesUseCase();
        const paginator: IPaginator = await listFilesUseCase.handle(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new FileTransformer());
    }

    @httpGet('/objects', AuthorizeMiddleware(Permissions.FILES_LIST))
    public async listFilesystemObjects (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ListObjectsRequest(req);
        await ValidatorRequest.handle(_request);

        const listObjectsUseCase = new ListObjectsUseCase();
        const objects = await listObjectsUseCase.handle(_request);

        this.responder.send(objects, req, res, StatusCode.HTTP_OK, new ObjectTransformer());
    }

    @httpPost('/base64', AuthorizeMiddleware(Permissions.FILES_UPLOAD))
    public async uploadBase64 (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new FileBase64RepRequest(req);
        await ValidatorRequest.handle(_request);

        const uploadBase64UseCase = new UploadBase64UseCase();
        const file = await uploadBase64UseCase.handle(_request);

        this.responder.send(file, req, res, StatusCode.HTTP_CREATED , new FileTransformer());
    }

    @httpPost('/', FileReqMulter.single('file'), AuthorizeMiddleware(Permissions.FILES_UPLOAD))
    public async uploadMultipart (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new FileMultipartRepRequest(req);
        await ValidatorRequest.handle(_request);

        const uploadMultipartUseCase = new UploadMultipartUseCase();
        const file = await uploadMultipartUseCase.handle(_request);

        this.responder.send(file, req, res, StatusCode.HTTP_CREATED , new FileTransformer());
    }

    @httpPost('/presignedGetObject', AuthorizeMiddleware(Permissions.FILES_DOWNLOAD))
    public async getPresignedGetObject (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new PresignedFileRepRequest(req);
        await ValidatorRequest.handle(_request);

        const getPresignedGetObjectUseCase = new GetPresignedGetObjectUseCase();
        const presignedGetObject = await getPresignedGetObjectUseCase.handle(_request);

        this.responder.send({presignedGetObject}, req, res, StatusCode.HTTP_OK, null);
    }

    @httpGet('/:id', AuthorizeMiddleware(Permissions.FILES_DOWNLOAD))
    public async downloadStreamFile (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        await ValidatorRequest.handle(_request);

        const downloadUseCase = new DownloadUseCase();

        const fileDto = await downloadUseCase.handle(_request);

        this.responder.sendStream(fileDto, res, StatusCode.HTTP_OK);
    }

    @httpPut('/base64/:id', AuthorizeMiddleware(Permissions.FILES_UPDATE))
    public async updateBase64 (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new FileUpdateBase64Request(req);
        await ValidatorRequest.handle(_request);

        const updateFileBase64UseCase = new UpdateFileBase64UseCase();
        const file = await updateFileBase64UseCase.handle(_request);

        this.responder.send(file, req, res, StatusCode.HTTP_CREATED , new FileTransformer());
    }

    @httpPut('/:id',FileReqMulter.single('file'), AuthorizeMiddleware(Permissions.FILES_UPDATE))
    public async updateMultipart (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new FileUpdateMultipartRequest(req);
        await ValidatorRequest.handle(_request);

        const updateFileMultipartUseCase = new UpdateFileMultipartUseCase();
        const file = await updateFileMultipartUseCase.handle(_request);

        this.responder.send(file, req, res, StatusCode.HTTP_CREATED , new FileTransformer());
    }
}

export default FileHandler;
