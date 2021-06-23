import {inject} from 'inversify';
import {controller, httpPost, request, response, next, httpGet, httpPut} from 'inversify-express-utils';
import {NextFunction, Request, Response} from 'express';
import {IPaginator, StatusCode} from '@digichanges/shared-experience';

import AuthorizeMiddleware from '../../../../Auth/Presentation/Middlewares/AuthorizeMiddleware';
import Permissions from '../../../../Config/Permissions';

import {TYPES} from '../../../../types';
import Responder from '../../../../App/Presentation/Shared/Responder';
import ListObjectsRequest from '../../Requests/Express/ListObjectsRequest';
import FileReqMulter from '../../Middlewares/FileReqMulter';
import FileBase64RepRequest from '../../Requests/Express/FileBase64RepRequest';
import FileMultipartRepRequest from '../../Requests/Express/FileMultipartRepRequest';
import PresignedFileRepRequest from '../../Requests/Express/PresignedFileRepRequest';
import FileRequestCriteria from '../../Requests/Express/FileRequestCriteria';
import FileTransformer from '../../Transformers/FileTransformer';
import IdRequest from '../../../../App/Presentation/Requests/Express/IdRequest';
import FileUpdateMultipartRequest from '../../Requests/Express/FileUpdateMultipartRequest';
import FileUpdateBase64Request from '../../Requests/Express/FileUpdateBase64Request';
import ObjectTransformer from '../../Transformers/ObjectTransformer';
import FileController from '../../Controllers/FileController';

@controller('/api/files')
class FileHandler
{
    @inject(TYPES.Responder)
    private responder: Responder;
    private readonly controller: FileController;

    constructor()
    {
        this.controller = new FileController();
    }

    @httpGet('/', AuthorizeMiddleware(Permissions.FILES_LIST))
    public async list(@request() req: Request, @response() res: Response)
    {
        const _request = new FileRequestCriteria(req.body);

        const paginator: IPaginator = await this.controller.list(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new FileTransformer());
    }

    @httpGet('/objects', AuthorizeMiddleware(Permissions.FILES_LIST))
    public async listFilesystemObjects(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ListObjectsRequest(req.query);

        const objects = await this.controller.listFilesystemObjects(_request);

        this.responder.send(objects, req, res, StatusCode.HTTP_OK, new ObjectTransformer());
    }

    @httpGet('/metadata/:id', AuthorizeMiddleware(Permissions.FILES_SHOW_METADATA))
    public async getFileMetadata(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req.params.id);

        const file = await this.controller.getFileMetadata(_request);

        this.responder.send(file, req, res, StatusCode.HTTP_OK, new FileTransformer());
    }

    @httpPost('/base64', AuthorizeMiddleware(Permissions.FILES_UPLOAD))
    public async uploadBase64(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new FileBase64RepRequest(req.body);

        const file = await this.controller.uploadBase64(_request);

        this.responder.send(file, req, res, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    @httpPost('/', FileReqMulter.single('file'), AuthorizeMiddleware(Permissions.FILES_UPLOAD))
    public async uploadMultipart(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new FileMultipartRepRequest(req.body);

        const file = await this.controller.uploadMultipart(_request);

        this.responder.send(file, req, res, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    @httpPost('/presignedGetObject', AuthorizeMiddleware(Permissions.FILES_DOWNLOAD))
    public async getPresignedGetObject(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new PresignedFileRepRequest(req.body);

        const presignedGetObject = await this.controller.getPresignedGetObject(_request);

        this.responder.send({presignedGetObject}, req, res, StatusCode.HTTP_OK, null);
    }

    @httpGet('/:id', AuthorizeMiddleware(Permissions.FILES_DOWNLOAD))
    public async downloadStreamFile(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req.params.id);

        const fileDto = await this.controller.downloadStreamFile(_request);

        this.responder.sendStream(fileDto, req, res, StatusCode.HTTP_OK);
    }

    @httpPut('/base64/:id', AuthorizeMiddleware(Permissions.FILES_UPDATE))
    public async updateBase64(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new FileUpdateBase64Request(req.body, req.params.id);

        const file = await this.controller.updateBase64(_request);

        this.responder.send(file, req, res, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    @httpPut('/:id', FileReqMulter.single('file'), AuthorizeMiddleware(Permissions.FILES_UPDATE))
    public async updateMultipart(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new FileUpdateMultipartRequest(req.body, req.params.id);

        const file = await this.controller.updateMultipart(_request);

        this.responder.send(file, req, res, StatusCode.HTTP_CREATED, new FileTransformer());
    }
}

export default FileHandler;
