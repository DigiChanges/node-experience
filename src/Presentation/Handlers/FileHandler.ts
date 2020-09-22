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
import DownloadUseCase from '../../Domain/UseCases/FileSystem/DownloadUseCase';
import GetPresignedGetObjectUseCase from '../../Domain/UseCases/FileSystem/GetPresignedGetObjectUseCase';
import UploadMultipartUseCase from '../../Domain/UseCases/FileSystem/UploadMultipartUseCase';
import FileReqMulter from '../Middlewares/FileReqMulter';
import Base64FileRepRequest from '../Requests/Handler/FileSystem/Base64FileRepRequest';
import ValidatorRequest from '../../Application/Shared/ValidatorRequest';
import MultipartFileRepRequest from '../Requests/Handler/FileSystem/MultipartFileRepRequest';
import PresignedFileRepRequest from '../Requests/Handler/FileSystem/PresignedFileRepRequest';
import FileRequestCriteria from '../Requests/Handler/FileSystem/FileRequestCriteria';
import FileTransformer from '../Transformers/Files/FileTransformer';
import IPaginator from '../../InterfaceAdapters/Shared/IPaginator';
import IdRequest from '../Requests/Handler/Defaults/IdRequest';

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

        await this.responder.paginate(paginator, res, StatusCode.HTTP_OK, new FileTransformer());
    }

    @httpGet('/objects', AuthorizeMiddleware(Permissions.FILES_LIST))
    public async listFilesystemObjects (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ListObjectsRequest(req);
        await ValidatorRequest.handle(_request);

        const listObjectsUseCase = new ListObjectsUseCase();
        const listObjects = await listObjectsUseCase.handle(_request);

        this.responder.send( {data: listObjects}, res, StatusCode.HTTP_OK, null );
    }

    @httpPost('/base64', AuthorizeMiddleware(Permissions.FILES_UPLOAD))
    public async uploadBase64 (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new Base64FileRepRequest(req);
        await ValidatorRequest.handle(_request);

        const uploadBase64UseCase = new UploadBase64UseCase();
        const data = await uploadBase64UseCase.handle(_request);

        this.responder.send({message: "File uploaded", data}, res, StatusCode.HTTP_CREATED , null );
    }

    @httpPost('/', FileReqMulter.single('file'), AuthorizeMiddleware(Permissions.FILES_UPLOAD))
    public async uploadMultipart (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new MultipartFileRepRequest(req);
        await ValidatorRequest.handle(_request);

        const uploadMultipartUseCase = new UploadMultipartUseCase();
        const data = await uploadMultipartUseCase.handle(_request);

        this.responder.send({message: "File uploaded", data}, res, StatusCode.HTTP_CREATED , null );
    }

    @httpPost('/presignedGetObject', AuthorizeMiddleware(Permissions.FILES_DOWNLOAD))
    public async getPresignedGetObject (@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new PresignedFileRepRequest(req);
        await ValidatorRequest.handle(_request);

        const getPresignedGetObjectUseCase = new GetPresignedGetObjectUseCase();
        const presignedGetObject = await getPresignedGetObjectUseCase.handle(_request);

        this.responder.send({presignedGetObject}, res, StatusCode.HTTP_OK, null);
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
}

export default FileHandler;
