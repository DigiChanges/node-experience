import Koa from 'koa';
import Router from 'koa-router';
import StatusCode from '../../../Shared/Application/StatusCode';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import FileController from '../Controllers/FileController';
import FileVersionTransformer from '../Transformers/FileVersionTransformer';
import FileKoaReqMulterMiddleware from '../Middlewares/FileKoaReqMulterMiddleware';
import ObjectTransformer from '../Transformers/ObjectTransformer';
import AuthorizeKoaMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeKoaMiddleware';
import Permissions from '../../../Config/Permissions';
import FileTransformer from '../Transformers/FileTransformer';
import CriteriaPayload from '../../../Shared/Presentation/Validations/CriteriaPayload';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/files'
};

const FileKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const controller = new FileController();

FileKoaHandler.get('/', AuthorizeKoaMiddleware(Permissions.FILES_LIST), async(ctx: Koa.ParameterizedContext & any) =>
{
    const data: CriteriaPayload = {
        query: ctx.request.query,
        url: ctx.request.url
    };

    const paginator: IPaginator = await controller.list(data);

    await responder.paginate(paginator, ctx, StatusCode.HTTP_OK, new FileVersionTransformer());
});

FileKoaHandler.get('/objects', AuthorizeKoaMiddleware(Permissions.FILES_LIST), async(ctx: Koa.ParameterizedContext & any) =>
{
    const { query } = ctx.request;

    const body = {
        ...query,
        recursive: query.recursive ? String(query.recursive) : undefined,
        prefix: query.prefix ? String(query.prefix) : undefined
    };

    const objects = await controller.listFilesystemObjects(body);

    void await responder.send(objects, ctx, StatusCode.HTTP_OK, new ObjectTransformer());
});

FileKoaHandler.get('/metadata/:id', AuthorizeKoaMiddleware(Permissions.FILES_SHOW_METADATA), async(ctx: Koa.ParameterizedContext & any) =>
{
    const body = {
        id: ctx.params.id
    };

    const file = await controller.getFileMetadata(body);

    void await responder.send(file, ctx, StatusCode.HTTP_OK, new FileTransformer());
});

FileKoaHandler.post('/base64', AuthorizeKoaMiddleware(Permissions.FILES_UPLOAD), async(ctx: Koa.ParameterizedContext & any) =>
{
    const { filename, base64 } = ctx.request.body;
    const partialBase64 = base64.split(';base64,');
    const _base64: string = partialBase64.pop();
    const mimeType = partialBase64.shift().split('data:').pop();
    const extension = filename.includes('.') ? filename.split('.').pop() : null;
    const { length } = Buffer.from(_base64.substring(_base64.indexOf(',') + 1));

    const body = {
        ...ctx.request.body,
        query: ctx.query,
        originalName: filename,
        base64: _base64,
        mimeType,
        extension,
        size: length,
        isImage: mimeType.includes('image')
    };

    const file = await controller.uploadBase64(body);

    void await responder.send(file, ctx, StatusCode.HTTP_CREATED, new FileTransformer());
});

FileKoaHandler.post('/', <any>FileKoaReqMulterMiddleware.single('file'), AuthorizeKoaMiddleware(Permissions.FILES_UPLOAD), async(ctx: Koa.ParameterizedContext & any) =>
{
    // TODO: Refactor
    const { originalname, encoding, mimetype, destination, filename, size } = ctx.request.file;
    const { isOriginalName, isPublic, isOverwrite, isOptimize } = ctx.request.query;

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

    const file = await controller.uploadMultipart(body);

    void await responder.send(file, ctx, StatusCode.HTTP_CREATED, new FileTransformer());
});

FileKoaHandler.post('/presigned-get-object', AuthorizeKoaMiddleware(Permissions.FILES_DOWNLOAD), async(ctx: Koa.ParameterizedContext & any) =>
{
    const body = {
        ...ctx.request.body,
        query: ctx.query
    };

    const presignedGetObject = await controller.getPresignedGetObject(body);

    void await responder.send({ presignedGetObject }, ctx, StatusCode.HTTP_OK, null);
});

FileKoaHandler.get('/:id', AuthorizeKoaMiddleware(Permissions.FILES_DOWNLOAD), async(ctx: Koa.ParameterizedContext) =>
{
    const data = {
        id: ctx.params.id,
        version: ctx.query?.version ? +ctx.query.version : null
    };

    const fileDto = await controller.downloadStreamFile(data);

    responder.sendStream(fileDto, ctx, StatusCode.HTTP_OK);
});

FileKoaHandler.put('/optimize/:id', AuthorizeKoaMiddleware(Permissions.FILES_DELETE), async(ctx: Koa.ParameterizedContext) =>
{
    const body = {
        id: ctx.params.id,
        ...ctx.query as any
    };

    const file = await controller.optimize(body);

    void await responder.send(file, ctx, StatusCode.HTTP_CREATED, new FileTransformer());
});

FileKoaHandler.put('/base64/:id', AuthorizeKoaMiddleware(Permissions.FILES_UPDATE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const { filename, base64 } = ctx.request.body;
    const partialBase64 = base64.split(';base64,');
    const _base64: string = partialBase64.pop();
    const mimeType = partialBase64.shift().split('data:').pop();
    const extension = filename.includes('.') ? filename.split('.').pop() : null;
    const { length } = Buffer.from(_base64.substring(_base64.indexOf(',') + 1));

    const body = {
        ...ctx.request.body,
        id: ctx.params.id,
        query: ctx.query,
        originalName: ctx.request.body.filename as string,
        base64: _base64,
        mimeType,
        extension,
        size: length,
        isImage: mimeType.includes('image')
    };

    const file = await controller.updateBase64(body);

    void await responder.send(file, ctx, StatusCode.HTTP_CREATED, new FileTransformer());
});

FileKoaHandler.put('/:id', <any>FileKoaReqMulterMiddleware.single('file'), AuthorizeKoaMiddleware(Permissions.FILES_UPDATE), async(ctx: Koa.ParameterizedContext) =>
{
    const { originalname, encoding, mimetype, destination, filename, size } = ctx.request.file;
    const { isOriginalName, isPublic, isOverwrite, isOptimize } = ctx.request.query;

    const body = {
        id: ctx.params.id,
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

    const response = await controller.updateMultipart(body);

    void await responder.send(response, ctx, StatusCode.HTTP_CREATED, new FileTransformer());
});

FileKoaHandler.delete('/:id', AuthorizeKoaMiddleware(Permissions.FILES_DELETE), async(ctx: Koa.ParameterizedContext) =>
{
    const body = {
        id: ctx.params.id
    };

    const file = await controller.removeFile(body);

    void await responder.send(file, ctx, StatusCode.HTTP_CREATED, new FileTransformer());
});

export default FileKoaHandler;
