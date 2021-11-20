import Koa from 'koa';
import Router from 'koa-router';
import { IPaginator, StatusCode } from '@digichanges/shared-experience';
import Responder from '../../../../App/Presentation/Shared/Koa/Responder';
import IdRequest from '../../../../App/Presentation/Requests/IdRequest';
import FileController from '../../Controllers/FileController';
import FileRequestCriteria from '../../Requests/FileRequestCriteria';
import FileTransformer from '../../Transformers/FileTransformer';
import ListObjectsRequest from '../../Requests/ListObjectsRequest';
import FileBase64RepRequest from '../../Requests/FileBase64RepRequest';
import PresignedFileRepRequest from '../../Requests/PresignedFileRepRequest';
import FileUpdateBase64Request from '../../Requests/FileUpdateBase64Request';
import FileUpdateMultipartRequest from '../../Requests/FileUpdateMultipartRequest';
import FileMultipartRepRequest from '../../Requests/FileMultipartRepRequest';
import FileReqMulter from '../../Middlewares/Koa/FileReqMulter';
import ObjectTransformer from '../../Transformers/ObjectTransformer';
import AuthorizeMiddleware from '../../../../Auth/Presentation/Middlewares/Koa/AuthorizeMiddleware';
import Permissions from '../../../../Config/Permissions';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/files'
};

const FileHandler: Router = new Router(routerOpts);
const responder: Responder = new Responder();
const controller = new FileController();

FileHandler.get('/', AuthorizeMiddleware(Permissions.FILES_LIST), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new FileRequestCriteria(ctx.request.query, ctx.request.url);

    const paginator: IPaginator = await controller.list(_request);

    await responder.paginate(paginator, ctx, StatusCode.HTTP_OK, new FileTransformer());
});

FileHandler.get('/objects', AuthorizeMiddleware(Permissions.FILES_LIST), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new ListObjectsRequest(ctx.request.query);

    const objects = await controller.listFilesystemObjects(_request);

    await responder.send(objects, ctx, StatusCode.HTTP_OK, new ObjectTransformer());
});

FileHandler.get('/metadata/:id', AuthorizeMiddleware(Permissions.FILES_SHOW_METADATA), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new IdRequest(ctx.params.id);

    const file = await controller.getFileMetadata(_request);

    responder.send(file, ctx, StatusCode.HTTP_OK, new FileTransformer());
});

FileHandler.post('/base64', AuthorizeMiddleware(Permissions.FILES_UPLOAD), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new FileBase64RepRequest(ctx.request.body);

    const file = await controller.uploadBase64(_request);

    responder.send(file, ctx, StatusCode.HTTP_CREATED, new FileTransformer());
});

FileHandler.post('/', <any>FileReqMulter.single('file'), AuthorizeMiddleware(Permissions.FILES_UPLOAD), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new FileMultipartRepRequest(ctx.request);

    const file = await controller.uploadMultipart(_request);

    responder.send(file, ctx, StatusCode.HTTP_CREATED, new FileTransformer());
});

FileHandler.post('/presigned-get-object', AuthorizeMiddleware(Permissions.FILES_DOWNLOAD), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new PresignedFileRepRequest(ctx.request.body);

    const presignedGetObject = await controller.getPresignedGetObject(_request);

    responder.send({ presignedGetObject }, ctx, StatusCode.HTTP_OK, null);
});

FileHandler.get('/:id', AuthorizeMiddleware(Permissions.FILES_DOWNLOAD), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new IdRequest(ctx.params.id);

    const fileDto = await controller.downloadStreamFile(_request);

    responder.sendStream(fileDto, ctx, StatusCode.HTTP_OK);
});

FileHandler.get('/:id', AuthorizeMiddleware(Permissions.FILES_DELETE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new IdRequest(ctx.params.id);

    const file = await controller.removeFile(_request);

    responder.send(file, ctx, StatusCode.HTTP_OK, new FileTransformer());
});

FileHandler.put('/base64/:id', AuthorizeMiddleware(Permissions.FILES_UPDATE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new FileUpdateBase64Request(ctx.request.body, ctx.params.id);

    const file = await controller.updateBase64(_request);

    responder.send(file, ctx, StatusCode.HTTP_CREATED, new FileTransformer());
});

FileHandler.put('/:id', <any>FileReqMulter.single('file'), AuthorizeMiddleware(Permissions.FILES_UPDATE), async(ctx: Koa.ParameterizedContext & any) =>
{
    const _request = new FileUpdateMultipartRequest(ctx.request, ctx.params.id);

    const file = await controller.updateMultipart(_request);

    responder.send(file, ctx, StatusCode.HTTP_CREATED, new FileTransformer());
});

export default FileHandler;
