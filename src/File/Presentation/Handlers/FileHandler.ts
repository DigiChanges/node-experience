import {inject} from 'inversify';
import {controller, httpPost, request, response, next, httpGet, httpPut} from 'inversify-express-utils';
import {NextFunction, Request, Response} from 'express';
import {IPaginator, StatusCode} from '@digichanges/shared-experience';

import AuthorizeMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeMiddleware';
import Permissions from '../../../Config/Permissions';

import {TYPES} from '../../../types';
import Responder from '../../../App/Presentation/Shared/Responder';
import ListObjectsRequest from '../Requests/ListObjectsRequest';
import ListFilesUseCase from '../../Domain/UseCases/ListFilesUseCase';
import ListObjectsUseCase from '../../Domain/UseCases/ListObjectsUseCase';
import UploadBase64UseCase from '../../Domain/UseCases/UploadBase64UseCase';
import DownloadUseCase from '../../Domain/UseCases/DownloadUseCase';
import GetPresignedGetObjectUseCase from '../../Domain/UseCases/GetPresignedGetObjectUseCase';
import UploadMultipartUseCase from '../../Domain/UseCases/UploadMultipartUseCase';
import FileReqMulter from '../Middlewares/FileReqMulter';
import FileBase64RepRequest from '../Requests/FileBase64RepRequest';
import ValidatorRequest from '../../../App/Presentation/Shared/ValidatorRequest';
import FileMultipartRepRequest from '../Requests/FileMultipartRepRequest';
import PresignedFileRepRequest from '../Requests/PresignedFileRepRequest';
import FileRequestCriteria from '../Requests/FileRequestCriteria';
import FileTransformer from '../Transformers/FileTransformer';
import IdRequest from '../../../App/Presentation/Requests/IdRequest';
import FileUpdateMultipartRequest from '../Requests/FileUpdateMultipartRequest';
import UpdateFileMultipartUseCase from '../../Domain/UseCases/UpdateFileMultipartUseCase';
import FileUpdateBase64Request from '../Requests/FileUpdateBase64Request';
import UpdateFileBase64UseCase from '../../Domain/UseCases/UpdateFileBase64UseCase';
import ObjectTransformer from '../Transformers/ObjectTransformer';
import GetFileMetadataUserCase from '../../Domain/UseCases/GetFileMetadataUseCase';

@controller('/api/files')
class FileHandler
{
    @inject(TYPES.Responder)
    private responder: Responder;

    @httpGet('/', AuthorizeMiddleware(Permissions.FILES_LIST))
    public async list(@request() req: Request, @response() res: Response)
    {
        const _request = new FileRequestCriteria(req);
        await ValidatorRequest.handle(_request);

        const listFilesUseCase = new ListFilesUseCase();
        const paginator: IPaginator = await listFilesUseCase.handle(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new FileTransformer());
    }

    @httpGet('/objects', AuthorizeMiddleware(Permissions.FILES_LIST))
    public async listFilesystemObjects(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new ListObjectsRequest(req);
        await ValidatorRequest.handle(_request);

        const listObjectsUseCase = new ListObjectsUseCase();
        const objects = await listObjectsUseCase.handle(_request);

        this.responder.send(objects, req, res, StatusCode.HTTP_OK, new ObjectTransformer());
    }

    @httpGet('/metadata/:id', AuthorizeMiddleware(Permissions.FILES_SHOW_METADATA))
    public async getFileMetadata(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        await ValidatorRequest.handle(_request);

        const getFileMetadataUserCase = new GetFileMetadataUserCase();

        const file = await getFileMetadataUserCase.handle(_request);

        this.responder.send(file, req, res, StatusCode.HTTP_OK, new FileTransformer());
    }

    @httpPost('/base64', AuthorizeMiddleware(Permissions.FILES_UPLOAD))
    public async uploadBase64(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new FileBase64RepRequest(req);
        await ValidatorRequest.handle(_request);

        const uploadBase64UseCase = new UploadBase64UseCase();
        const file = await uploadBase64UseCase.handle(_request);

        this.responder.send(file, req, res, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    @httpPost('/', FileReqMulter.single('file'), AuthorizeMiddleware(Permissions.FILES_UPLOAD))
    public async uploadMultipart(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new FileMultipartRepRequest(req);
        await ValidatorRequest.handle(_request);

        const uploadMultipartUseCase = new UploadMultipartUseCase();
        const file = await uploadMultipartUseCase.handle(_request);

        this.responder.send(file, req, res, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    @httpPost('/presignedGetObject', AuthorizeMiddleware(Permissions.FILES_DOWNLOAD))
    public async getPresignedGetObject(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new PresignedFileRepRequest(req);
        await ValidatorRequest.handle(_request);

        const getPresignedGetObjectUseCase = new GetPresignedGetObjectUseCase();
        const presignedGetObject = await getPresignedGetObjectUseCase.handle(_request);

        this.responder.send({presignedGetObject}, req, res, StatusCode.HTTP_OK, null);
    }

    @httpGet('/:id', AuthorizeMiddleware(Permissions.FILES_DOWNLOAD))
    public async downloadStreamFile(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        await ValidatorRequest.handle(_request);

        const downloadUseCase = new DownloadUseCase();

        const fileDto = await downloadUseCase.handle(_request);

        this.responder.sendStream(fileDto, req, res, StatusCode.HTTP_OK);
    }

    @httpPut('/base64/:id', AuthorizeMiddleware(Permissions.FILES_UPDATE))
    public async updateBase64(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new FileUpdateBase64Request(req);
        await ValidatorRequest.handle(_request);

        const updateFileBase64UseCase = new UpdateFileBase64UseCase();
        const file = await updateFileBase64UseCase.handle(_request);

        this.responder.send(file, req, res, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    @httpPut('/:id', FileReqMulter.single('file'), AuthorizeMiddleware(Permissions.FILES_UPDATE))
    public async updateMultipart(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new FileUpdateMultipartRequest(req);
        await ValidatorRequest.handle(_request);

        const updateFileMultipartUseCase = new UpdateFileMultipartUseCase();
        const file = await updateFileMultipartUseCase.handle(_request);

        this.responder.send(file, req, res, StatusCode.HTTP_CREATED, new FileTransformer());
    }
}

export default FileHandler;
