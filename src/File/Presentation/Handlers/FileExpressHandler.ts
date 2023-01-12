import { controller, httpPost, request, response, next, httpGet, httpPut, httpDelete } from 'inversify-express-utils';
import { NextFunction, Request, Response } from 'express';
import StatusCode from '../../../Shared/Application/StatusCode';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import AuthorizeExpressMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeExpressMiddleware';
import Permissions from '../../../Config/Permissions';

import ExpressResponder from '../../../Shared/Application/Http/ExpressResponder';
import FileExpressReqMulterMiddleware from '../Middlewares/FileExpressReqMulterMiddleware';
import FileVersionTransformer from '../Transformers/FileVersionTransformer';
import ObjectTransformer from '../Transformers/ObjectTransformer';
import FileController from '../Controllers/FileController';
import FileTransformer from '../Transformers/FileTransformer';
import CriteriaPayload from '../../../Shared/Presentation/Validations/CriteriaPayload';

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

    @httpGet('/', void AuthorizeExpressMiddleware(Permissions.FILES_LIST))
    public async list(@request() req: Request, @response() res: Response)
    {
        const body: CriteriaPayload = {
            query: req.query,
            url: req.url
        };

        const paginator: IPaginator = await this.controller.list(body);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new FileVersionTransformer());
    }

    @httpGet('/objects', void AuthorizeExpressMiddleware(Permissions.FILES_LIST))
    public async listFilesystemObjects(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const query = req.query as any;

        const body = {
            ...query,
            recursive: query.recursive ? String(query.recursive) : undefined,
            prefix: query.prefix ? String(query.prefix) : undefined
        };

        const objects = await this.controller.listFilesystemObjects(body);

        void await this.responder.send(objects, req, res, StatusCode.HTTP_OK, new ObjectTransformer());
    }

    @httpGet('/metadata/:id', void AuthorizeExpressMiddleware(Permissions.FILES_SHOW_METADATA))
    public async getFileMetadata(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const body = {
            id: req.params.id
        };

        const file = await this.controller.getFileMetadata(body);

        void await this.responder.send(file, req, res, StatusCode.HTTP_OK, new FileTransformer());
    }

    @httpPut('/optimize/:id', void AuthorizeExpressMiddleware(Permissions.FILES_UPLOAD))
    public async optimize(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const body = {
            id: req.params.id,
            ...req.query as any
        };

        const file = await this.controller.optimize(body);

        void await this.responder.send(file, req, res, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    @httpPost('/base64', void AuthorizeExpressMiddleware(Permissions.FILES_UPLOAD))
    public async uploadBase64(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const { filename, base64 } = req.body;
        const partialBase64 = base64.split(';base64,');
        const _base64: string = partialBase64.pop();
        const mimeType = partialBase64.shift().split('data:').pop();
        const extension = filename.includes('.') ? filename.split('.').pop() : null;
        const { length } = Buffer.from(_base64.substring(_base64.indexOf(',') + 1));

        const body = {
            ...req.body,
            query: req.query,
            originalName: req.body.filename,
            base64: _base64,
            mimeType,
            extension,
            size: length,
            isImage: mimeType.includes('image')
        };

        const file = await this.controller.uploadBase64(body);

        void await this.responder.send(file, req, res, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    @httpPost('/', FileExpressReqMulterMiddleware.single('file'), void AuthorizeExpressMiddleware(Permissions.FILES_UPLOAD))
    public async uploadMultipart(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const { originalname, encoding, mimetype, destination, filename, size } = req.file;
        const { isOriginalName, isPublic, isOverwrite, isOptimize } = req.query;

        const body = {
            file: {
                originalName: originalname,
                mimeType: mimetype,
                destination,
                extension: originalname.includes('.') ? originalname.split('.').pop() : '',
                filename,
                path: '/',
                size,
                encoding,
                isImage: mimetype.includes('image')
            },
            query: {
                isOriginalName: isOriginalName === 'true',
                isPublic: isPublic === 'true',
                isOverwrite: isOverwrite === 'true',
                isOptimize: isOptimize === 'true'
            }
        };

        const file = await this.controller.uploadMultipart(body);

        void await this.responder.send(file, req, res, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    @httpPost('/presigned-get-object', void AuthorizeExpressMiddleware(Permissions.FILES_DOWNLOAD))
    public async getPresignedGetObject(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const body = {
            ...req.body,
            query: req.query
        };

        const presignedGetObject = await this.controller.getPresignedGetObject(body);

        void await this.responder.send({ presignedGetObject }, req, res, StatusCode.HTTP_OK, null);
    }

    @httpGet('/:id', void AuthorizeExpressMiddleware(Permissions.FILES_DOWNLOAD))
    public async downloadStreamFile(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const body = {
            id: req.params.id,
            version: req.query?.version ? +req.query.version : null
        };

        const fileDto = await this.controller.downloadStreamFile(body);

        this.responder.sendStream(fileDto, req, res, StatusCode.HTTP_OK);
    }

    @httpDelete('/:id', void AuthorizeExpressMiddleware(Permissions.FILES_DELETE))
    public async removeFile(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const body = {
            id: req.params.id
        };

        const file = await this.controller.removeFile(body);

        void await this.responder.send(file, req, res, StatusCode.HTTP_OK, new FileTransformer());
    }

    @httpPut('/base64/:id', void AuthorizeExpressMiddleware(Permissions.FILES_UPDATE))
    public async updateBase64(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const { filename, base64 } = req.body;
        const partialBase64 = base64.split(';base64,');
        const _base64: string = partialBase64.pop();
        const mimeType = partialBase64.shift().split('data:').pop();
        const extension = filename.includes('.') ? filename.split('.').pop() : null;
        const { length } = Buffer.from(_base64.substring(_base64.indexOf(',') + 1));

        const body = {
            ...req.body,
            id: req.params.id,
            query: req.query as unknown,
            originalName: req.body.filename,
            base64: _base64,
            mimeType,
            extension,
            size: length,
            isImage: mimeType.includes('image')
        };

        const file = await this.controller.updateBase64(body);

        void await this.responder.send(file, req, res, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    @httpPut('/:id', FileExpressReqMulterMiddleware.single('file'), void AuthorizeExpressMiddleware(Permissions.FILES_UPDATE))
    public async updateMultipart(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const { originalname, encoding, mimetype, destination, filename, size } = req.file;
        const { isOriginalName, isPublic, isOverwrite, isOptimize } = req.query;

        const body = {
            id: req.params.id,
            file: {
                originalName: originalname,
                mimeType: mimetype,
                destination,
                extension: originalname.includes('.') ? originalname.split('.').pop() : '',
                filename,
                path: '/',
                size,
                encoding,
                isImage: mimetype.includes('image')
            },
            query: {
                isOriginalName: isOriginalName === 'true',
                isPublic: isPublic === 'true',
                isOverwrite: isOverwrite === 'true',
                isOptimize: isOptimize === 'true'
            }
        };

        const file = await this.controller.updateMultipart(body);

        void await this.responder.send(file, req, res, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    @httpDelete('/:id', void AuthorizeExpressMiddleware(Permissions.FILES_DELETE))
    public async deleteFile(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const body = {
            id: req.params.id
        };

        const file = await this.controller.removeFile(body);

        void await this.responder.send(file, req, res, StatusCode.HTTP_CREATED, new FileVersionTransformer());
    }
}

export default FileExpressHandler;
