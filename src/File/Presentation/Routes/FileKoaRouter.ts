import Router from 'koa-router';
import FileController from '../Controllers/FileKoaController';
import AuthorizeKoaMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeKoaMiddleware';
import Permissions from '../../../Config/Permissions';

const routerOpts: Router.IRouterOptions = {
    prefix: '/api/files'
};

const FileKoaRouter: Router = new Router(routerOpts);

FileKoaRouter.get('/', AuthorizeKoaMiddleware(Permissions.FILES_LIST), FileController.listFiles);
FileKoaRouter.get('/objects', AuthorizeKoaMiddleware(Permissions.FILES_LIST), FileController.listObjects);
FileKoaRouter.get('/metadata/:id', AuthorizeKoaMiddleware(Permissions.FILES_SHOW_METADATA), FileController.getFileMetadata);
FileKoaRouter.post('/base64', AuthorizeKoaMiddleware(Permissions.FILES_UPLOAD), FileController.uploadBase64);
FileKoaRouter.post('/', AuthorizeKoaMiddleware(Permissions.FILES_UPLOAD), FileController.uploadMultipart);
FileKoaRouter.post('/presigned-get-object', AuthorizeKoaMiddleware(Permissions.FILES_LIST), FileController.getPresignedGetObject);
FileKoaRouter.get('/:id', AuthorizeKoaMiddleware(Permissions.FILES_DOWNLOAD), FileController.download);
FileKoaRouter.put('/optimize/:id', AuthorizeKoaMiddleware(Permissions.FILES_UPDATE), FileController.optimize);
FileKoaRouter.put('/base64/:id', AuthorizeKoaMiddleware(Permissions.FILES_UPDATE), FileController.updateBase64);
FileKoaRouter.put('/:id', AuthorizeKoaMiddleware(Permissions.FILES_UPDATE), FileController.updateMultipart);
FileKoaRouter.delete('/:id', AuthorizeKoaMiddleware(Permissions.FILES_DELETE), FileController.remove);

export default FileKoaRouter;
