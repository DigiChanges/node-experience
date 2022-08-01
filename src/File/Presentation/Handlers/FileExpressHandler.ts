import { controller, httpPost, request, response, next, httpGet, httpPut, httpDelete } from 'inversify-express-utils';
import { NextFunction, Request, Response } from 'express';
import StatusCode from '../../../Shared/Application/StatusCode';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import AuthorizeExpressMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeExpressMiddleware';
import Permissions from '../../../Config/Permissions';

import ExpressResponder from '../../../Shared/Application/Http/ExpressResponder';
import ListObjectsRequest from '../Requests/ListObjectsRequest';
import FileExpressReqMulter from '../Middlewares/FileExpressReqMulter';
import FileBase64RepRequest from '../Requests/FileBase64RepRequest';
import FileMultipartRepRequest from '../Requests/FileMultipartRepRequest';
import PresignedFileRepRequest from '../Requests/PresignedFileRepRequest';
import FileRequestCriteria from '../Requests/FileRequestCriteria';
import FileTransformer from '../Transformers/FileTransformer';
import IdRequest from '../../../Shared/Presentation/Requests/IdRequest';
import FileUpdateMultipartRequest from '../Requests/FileUpdateMultipartRequest';
import FileUpdateBase64Request from '../Requests/FileUpdateBase64Request';
import ObjectTransformer from '../Transformers/ObjectTransformer';
import FileController from '../Controllers/FileController';

@controller('/api/files')
class FileExpressHandler
{
    private responder: ExpressResponder;
    private readonly controller: FileController;

    constructor()
    {
        this.responder = new ExpressResponder();
        this.controller = new FileController();
    }

    @httpGet('/', AuthorizeExpressMiddleware(Permissions.FILES_LIST))
    public async list(@request() req: Request, @response() res: Response)
    {
        const _request = new FileRequestCriteria(req.query, req.url);

        const paginator: IPaginator = await this.controller.list(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new FileTransformer());
    }

    @httpGet('/objects', AuthorizeExpressMiddleware(Permissions.FILES_LIST))
    public async listFilesystemObjects(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ListObjectsRequest(req.query);

        const objects = await this.controller.listFilesystemObjects(_request);

        void await this.responder.send(objects, req, res, StatusCode.HTTP_OK, new ObjectTransformer());
    }

    @httpGet('/metadata/:id', AuthorizeExpressMiddleware(Permissions.FILES_SHOW_METADATA))
    public async getFileMetadata(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest({ id: req.params.id });

        const file = await this.controller.getFileMetadata(_request);

        void await this.responder.send(file, req, res, StatusCode.HTTP_OK, new FileTransformer());
    }

    @httpPost('/base64', AuthorizeExpressMiddleware(Permissions.FILES_UPLOAD))
    public async uploadBase64(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const body = {
            data: req.body,
            query: req.query
        };

        const _request = new FileBase64RepRequest(body);

        const file = await this.controller.uploadBase64(_request);

        void await this.responder.send(file, req, res, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    @httpPost('/', FileExpressReqMulter.single('file'), AuthorizeExpressMiddleware(Permissions.FILES_UPLOAD))
    public async uploadMultipart(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const body = {
            file: req.file,
            params: req.params
        };

        const _request = new FileMultipartRepRequest(body);

        const file = await this.controller.uploadMultipart(_request);

        void await this.responder.send(file, req, res, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    @httpPost('/presigned-get-object', AuthorizeExpressMiddleware(Permissions.FILES_DOWNLOAD))
    public async getPresignedGetObject(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const body = {
            data: req.body,
            query: req.query
        };

        const _request = new PresignedFileRepRequest(body);

        const presignedGetObject = await this.controller.getPresignedGetObject(_request);

        void await this.responder.send({ presignedGetObject }, req, res, StatusCode.HTTP_OK, null);
    }

    @httpGet('/:id', AuthorizeExpressMiddleware(Permissions.FILES_DOWNLOAD))
    public async downloadStreamFile(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest({ id: req.params.id });

        const fileDto = await this.controller.downloadStreamFile(_request);

        this.responder.sendStream(fileDto, req, res, StatusCode.HTTP_OK);
    }

    @httpDelete('/:id', AuthorizeExpressMiddleware(Permissions.FILES_DELETE))
    public async removeFile(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest({ id: req.params.id });

        const file = await this.controller.removeFile(_request);

        void await this.responder.send(file, req, res, StatusCode.HTTP_OK, new FileTransformer());
    }

    @httpPut('/base64/:id', AuthorizeExpressMiddleware(Permissions.FILES_UPDATE))
    public async updateBase64(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const body = {
            data: req.body,
            query: req.query,
            id: req.params.id
        };

        const _request = new FileUpdateBase64Request(body);

        const file = await this.controller.updateBase64(_request);

        void await this.responder.send(file, req, res, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    @httpPut('/:id', FileExpressReqMulter.single('file'), AuthorizeExpressMiddleware(Permissions.FILES_UPDATE))
    public async updateMultipart(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const body = {
            file: req.file,
            params: req.params,
            id: req.params.id
        };

        const _request = new FileUpdateMultipartRequest(body);

        const file = await this.controller.updateMultipart(_request);

        void await this.responder.send(file, req, res, StatusCode.HTTP_CREATED, new FileTransformer());
    }
    @httpDelete('/:id', AuthorizeExpressMiddleware(Permissions.FILES_DELETE))
    public async deleteFile(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const body = {
            id: req.params.id
        };

        const _request = new IdRequest(body);

        const file = await this.controller.removeFile(_request);

        void await this.responder.send(file, req, res, StatusCode.HTTP_CREATED, new FileTransformer());
    }
}

export default FileExpressHandler;
