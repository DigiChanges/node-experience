import { inject } from 'inversify';
import { controller, httpPost, request, response, next, httpGet, httpPut } from 'inversify-express-utils';
import { NextFunction, Request, Response } from 'express';
import { IPaginator, StatusCode } from '@digichanges/shared-experience';

import AuthorizeMiddleware from '../../../../Auth/Presentation/Middlewares/Express/AuthorizeMiddleware';
import Permissions from '../../../../Config/Permissions';

import { TYPES } from '../../../../types';
import Responder from '../../../../App/Presentation/Shared/Express/Responder';
import ListObjectsRequest from '../../Requests/Express/ListObjectsRequest';
import FileReqMulter from '../../Middlewares/Express/FileReqMulter';
import FileBase64RepRequest from '../../Requests/Express/FileBase64RepRequest';
import FileMultipartRepRequest from '../../Requests/Express/FileMultipartRepRequest';
import PresignedFileRepRequest from '../../Requests/Express/PresignedFileRepRequest';
import FileRequestCriteria from '../../Requests/Express/FileRequestCriteria';
import FileTransformer from '../../Transformers/FileTransformer';
import IdRequest from '../../../../App/Presentation/Requests/IdRequest';
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
        const _request = new FileRequestCriteria(req.query, req.url);

        const paginator: IPaginator = await this.controller.list(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new FileTransformer());
    }

    @httpGet('/objects', AuthorizeMiddleware(Permissions.FILES_LIST))
    public async list_filesystem_objects(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ListObjectsRequest(req.query);

        const objects = await this.controller.list_filesystem_objects(_request);

        this.responder.send(objects, req, res, StatusCode.HTTP_OK, new ObjectTransformer());
    }

    @httpGet('/metadata/:id', AuthorizeMiddleware(Permissions.FILES_SHOW_METADATA))
    public async get_file_metadata(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req.params.id);

        const file = await this.controller.get_file_metadata(_request);

        this.responder.send(file, req, res, StatusCode.HTTP_OK, new FileTransformer());
    }

    @httpPost('/base64', AuthorizeMiddleware(Permissions.FILES_UPLOAD))
    public async upload_base64(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new FileBase64RepRequest(req.body);

        const file = await this.controller.upload_base64(_request);

        this.responder.send(file, req, res, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    @httpPost('/', FileReqMulter.single('file'), AuthorizeMiddleware(Permissions.FILES_UPLOAD))
    public async upload_multipart(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new FileMultipartRepRequest(req.body);

        const file = await this.controller.upload_multipart(_request);

        this.responder.send(file, req, res, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    @httpPost('/presignedGetObject', AuthorizeMiddleware(Permissions.FILES_DOWNLOAD))
    public async get_presigned_get_object(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new PresignedFileRepRequest(req.body);

        const presignedGetObject = await this.controller.get_presigned_get_object(_request);

        this.responder.send({ presignedGetObject }, req, res, StatusCode.HTTP_OK, null);
    }

    @httpGet('/:id', AuthorizeMiddleware(Permissions.FILES_DOWNLOAD))
    public async download_stream_file(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req.params.id);

        const fileDto = await this.controller.download_stream_file(_request);

        this.responder.sendStream(fileDto, req, res, StatusCode.HTTP_OK);
    }

    @httpPut('/base64/:id', AuthorizeMiddleware(Permissions.FILES_UPDATE))
    public async update_base64(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new FileUpdateBase64Request(req.body, req.params.id);

        const file = await this.controller.update_base64(_request);

        this.responder.send(file, req, res, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    @httpPut('/:id', FileReqMulter.single('file'), AuthorizeMiddleware(Permissions.FILES_UPDATE))
    public async update_multipart(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new FileUpdateMultipartRequest(req.body, req.params.id);

        const file = await this.controller.update_multipart(_request);

        this.responder.send(file, req, res, StatusCode.HTTP_CREATED, new FileTransformer());
    }
}

export default FileHandler;
