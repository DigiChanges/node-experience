import Koa from 'koa';
import Router from 'koa-router';
import StatusCode from '../../../Shared/Application/StatusCode';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import IdRequest from '../../../Shared/Presentation/Requests/IdRequest';
import FileController from '../Controllers/FileController';
import FileRequestCriteria from '../Requests/FileRequestCriteria';
import FileTransformer from '../Transformers/FileTransformer';
import ListObjectsRequest from '../Requests/ListObjectsRequest';
import FileBase64RepRequest from '../Requests/FileBase64RepRequest';
import PresignedFileRepRequest from '../Requests/PresignedFileRepRequest';
import FileUpdateBase64Request from '../Requests/FileUpdateBase64Request';
import FileUpdateMultipartRequest from '../Requests/FileUpdateMultipartRequest';
import FileMultipartRepRequest from '../Requests/FileMultipartRepRequest';
import FileKoaReqMulterMiddleware from '../Middlewares/FileKoaReqMulterMiddleware';
import ObjectTransformer from '../Transformers/ObjectTransformer';
import AuthorizeKoaMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeKoaMiddleware';
import Permissions from '../../../Config/Permissions';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/files'
};

const FileKoaHandler: Router = new Router(routerOpts);
const responder: KoaResponder = new KoaResponder();
const controller = new FileController();

FileKoaHandler.get('/', AuthorizeKoaMiddleware(Permissions.FILES_LIST), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new FileRequestCriteria(ctx.request.query, ctx.request.url);

    const paginator: IPaginator = await controller.list(_request);

    await responder.paginate(paginator, ctx, StatusCode.HTTP_OK, new FileTransformer());
});

FileKoaHandler.get('/objects', AuthorizeKoaMiddleware(Permissions.FILES_LIST), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new ListObjectsRequest(ctx.request.query);

    const objects = await controller.listFilesystemObjects(_request);

    void await responder.send(objects, ctx, StatusCode.HTTP_OK, new ObjectTransformer());
});

FileKoaHandler.get('/metadata/:id', AuthorizeKoaMiddleware(Permissions.FILES_SHOW_METADATA), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new IdRequest({ id: ctx.params.id });

    const file = await controller.getFileMetadata(_request);

    void await responder.send(file, ctx, StatusCode.HTTP_OK, new FileTransformer());
});

FileKoaHandler.post('/base64', AuthorizeKoaMiddleware(Permissions.FILES_UPLOAD), async(ctx: Koa.ParameterizedContext & any) =>
{
    const body = {
        data: ctx.request.body,
        query: ctx.query
    };

    const _request = new FileBase64RepRequest(body);

    const file = await controller.uploadBase64(_request);

    void await responder.send(file, ctx, StatusCode.HTTP_CREATED, new FileTransformer());
});

FileKoaHandler.post('/', <any>FileKoaReqMulterMiddleware.single('file'), AuthorizeKoaMiddleware(Permissions.FILES_UPLOAD), async(ctx: Koa.ParameterizedContext & any) =>
{
    const body = {
        file: ctx.request.file,
        query: ctx.query
    };

    const _request = new FileMultipartRepRequest(body);

    const file = await controller.uploadMultipart(_request);

    void await responder.send(file, ctx, StatusCode.HTTP_CREATED, new FileTransformer());
});

FileKoaHandler.post('/presigned-get-object', AuthorizeKoaMiddleware(Permissions.FILES_DOWNLOAD), async(ctx: Koa.ParameterizedContext) =>
{
    const body = {
        data: ctx.request.body,
        query: ctx.query
    };

    const _request = new PresignedFileRepRequest(body);

    const presignedGetObject = await controller.getPresignedGetObject(_request);

    void await responder.send({ presignedGetObject }, ctx, StatusCode.HTTP_OK, null);
});

FileKoaHandler.get('/:id', AuthorizeKoaMiddleware(Permissions.FILES_DOWNLOAD), async(ctx: Koa.ParameterizedContext) =>
{
    const _request = new IdRequest({ id: ctx.params.id });

    const fileDto = await controller.downloadStreamFile(_request);

    responder.sendStream(fileDto, ctx, StatusCode.HTTP_OK);
});

FileKoaHandler.get('/:id', AuthorizeKoaMiddleware(Permissions.FILES_DELETE), async(ctx: Koa.ParameterizedContext) =>
{
    const _request = new IdRequest({ id: ctx.params.id });

    const file = await controller.removeFile(_request);

    void await responder.send(file, ctx, StatusCode.HTTP_OK, new FileTransformer());
});

FileKoaHandler.put('/base64/:id', AuthorizeKoaMiddleware(Permissions.FILES_UPDATE), async(ctx: Koa.ParameterizedContext) =>
{
    const body = {
        data: ctx.request.body,
        query: ctx.query,
        id: ctx.params.id
    };

    const _request = new FileUpdateBase64Request(body);

    const file = await controller.updateBase64(_request);

    void await responder.send(file, ctx, StatusCode.HTTP_CREATED, new FileTransformer());
});

FileKoaHandler.put('/:id', <any>FileKoaReqMulterMiddleware.single('file'), AuthorizeKoaMiddleware(Permissions.FILES_UPDATE), async(ctx: Koa.ParameterizedContext) =>
{
    const body = {
        file: ctx.request.file,
        params: ctx.params,
        id: ctx.params.id
    };

    const _request = new FileUpdateMultipartRequest(body);

    const file = await controller.updateMultipart(_request);

    void await responder.send(file, ctx, StatusCode.HTTP_CREATED, new FileTransformer());
});

FileKoaHandler.delete('/:id', AuthorizeKoaMiddleware(Permissions.FILES_DELETE), async(ctx: Koa.ParameterizedContext) =>
{
    const body = {
        id: ctx.params.id
    };

    const _request = new IdRequest(body);

    const file = await controller.removeFile(_request);

    void await responder.send(file, ctx, StatusCode.HTTP_CREATED, new FileTransformer());
});

export default FileKoaHandler;
