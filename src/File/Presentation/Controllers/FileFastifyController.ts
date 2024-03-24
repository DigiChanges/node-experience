import FileVersionTransformer from '../Transformers/FileVersionTransformer';
import ObjectTransformer from '../Transformers/ObjectTransformer';
import FileTransformer from '../Transformers/FileTransformer';
import FileFilter from '../Criterias/FileFilter';
import FileSort from '../Criterias/FileSort';
import Pagination from '../../../Shared/Utils/Pagination';
import ListFilesUseCase from '../../Domain/UseCases/ListFilesUseCase';
import ListObjectsUseCase from '../../Domain/UseCases/ListObjectsUseCase';
import GetFileMetadataUseCase from '../../Domain/UseCases/GetFileMetadataUseCase';
import FileBase64RepPayload from '../../Domain/Payloads/FileBase64RepPayload';
import FileBase64SchemaValidation from '../../Domain/Validations/FileBase64SchemaValidation';
import UploadBase64UseCase from '../../Domain/UseCases/UploadBase64UseCase';
import UploadMultipartUseCase from '../../Domain/UseCases/UploadMultipartUseCase';
import GetPresignedGetObjectUseCase from '../../Domain/UseCases/GetPresignedGetObjectUseCase';
import PresignedFileRepPayload from '../../Domain/Payloads/PresignedFileRepPayload';
import DownloadUseCase from '../../Domain/UseCases/DownloadUseCase';
import OptimizeUseCase from '../../Domain/UseCases/OptimizeUseCase';
import UpdateFileBase64UseCase from '../../Domain/UseCases/UpdateFileBase64UseCase';
import IFileDTO from '../../Domain/Models/IFileDTO';
import FileUpdateBase64Payload from '../../Domain/Payloads/FileUpdateBase64Payload';
import UpdateFileMultipartUseCase from '../../Domain/UseCases/UpdateFileMultipartUseCase';
import RemoveFileUseCase from '../../Domain/UseCases/RemoveFileUseCase';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ParsedQs } from 'qs';
import FastifyResponder from '../../../Main/Presentation/Utils/FastifyResponder';
import { IRequestFastify } from '../../../Shared/Utils/types';
import ValidatorSchema from '../../../Main/Domain/Shared/ValidatorSchema';
import { StatusCode } from '../../../Main/Presentation/Application/StatusCode';
import { ICriteria, RequestCriteria } from '../../../Main/Domain/Criteria';
import { IdPayload } from '../../../Main/Domain/Payloads/IdPayload';
import { IPaginator } from '../../../Main/Domain/Criteria/IPaginator';

const responder: FastifyResponder = new FastifyResponder();

class FileController
{
    // TODO implmente IFastify(extends from QueryRequest, bodyRequest, params request) request, or simple request(QueryRequest, bodyRequest, params request)
    static async listFiles(request: FastifyRequest<IRequestFastify>, reply: FastifyReply): Promise<void>
    {
        const { query, url } = request;

        const requestCriteria: ICriteria = new RequestCriteria({
            filter: new FileFilter(query as ParsedQs),
            sort: new FileSort(query as ParsedQs),
            pagination: new Pagination(query as ParsedQs, url)
        });

        const useCase = new ListFilesUseCase();
        const paginator: IPaginator = await useCase.handle(requestCriteria);

        await responder.paginate(paginator, reply, StatusCode.HTTP_OK, new FileVersionTransformer());
    }

    static async listObjects(request: any, reply: FastifyReply): Promise<void>
    {
        const query = request.query;
        const payload = {
            ...query,
            recursive: query.recursive ? query.recursive : undefined,
            prefix: query.prefix ? String(query.prefix) : undefined
        };

        const useCase = new ListObjectsUseCase();
        const objects = await useCase.handle(payload);

        void await responder.send(objects, reply, StatusCode.HTTP_OK, new ObjectTransformer());
    }

    static async getFileMetadata(request: FastifyRequest, reply: FastifyReply): Promise<void>
    {
        const payload = {
            id: (request.params as IdPayload).id
        };

        const useCase = new GetFileMetadataUseCase();
        const file = await useCase.handle(payload);

        void await responder.send(file, reply, StatusCode.HTTP_OK, new FileTransformer());
    }

    static async uploadBase64(request: any, reply: FastifyReply): Promise<void>
    {
        const { filename, base64 } = request.body;
        const partialBase64 = base64.split(';base64,');
        const _base64: string = partialBase64.pop();
        const mimeType = partialBase64.shift().split('data:').pop();
        const extension = filename.includes('.') ? filename.split('.').pop() : null;
        const { length } = Buffer.from(_base64.substring(_base64.indexOf(',') + 1));

        const payload = {
            ...request.body,
            query: request.query,
            originalName: filename,
            base64: _base64,
            mimeType,
            extension,
            size: length,
            isImage: mimeType.includes('image')
        };

        const cleanData = await ValidatorSchema.handle<FileBase64RepPayload>(
            FileBase64SchemaValidation,
            payload
        );

        const useCase = new UploadBase64UseCase();
        const file = await useCase.handle(cleanData);

        void await responder.send(file, reply, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    static async uploadMultipart(request: any, reply: FastifyReply): Promise<void>
    {
        if (!request.file)
        {
            return void await responder.send('No file received', reply, StatusCode.HTTP_BAD_REQUEST);
        }

        const { originalname, encoding, mimetype, destination, filename, size } = request.file;
        const { isOriginalName, isPublic, isOverwrite, isOptimize } = request.query;

        const payload = {
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

        const useCase = new UploadMultipartUseCase();
        const uploadedFile = await useCase.handle(payload);

        void await responder.send(uploadedFile, reply, StatusCode.HTTP_CREATED, new FileTransformer());
    }
    static async uploadMultipleImages(request: any, reply: FastifyReply): Promise<void>
    {
        const files = request.files;

        if (!files)
        {
            return void await responder.send('No files received', reply, StatusCode.HTTP_BAD_REQUEST);
        }

        const responseFiles = [];

        for (const file of files)
        {
            const { originalname, encoding, mimetype, destination, filename, size } = file;
            const { isOriginalName, isPublic, isOverwrite, isOptimize } = request.query;
            const payload = {
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

            const useCase = new UploadMultipartUseCase();
            responseFiles.push((await useCase.handle(payload)));
        }

        void await responder.send(responseFiles, reply, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    static async getPresignedGetObject(request: any, reply: FastifyReply): Promise<void>
    {
        const payload: PresignedFileRepPayload = {
            ...request.body,
            query: request.query
        };

        const useCase = new GetPresignedGetObjectUseCase();
        const presignedGetObject = await useCase.handle(payload);

        void await responder.send({ presignedGetObject }, reply, StatusCode.HTTP_OK, null);
    }

    static async download(request: any, reply: FastifyReply): Promise<void>
    {
        const payload = {
            id: request.params.id,
            version: request.query?.version ? +request.query.version : null
        };

        const useCase = new DownloadUseCase();
        const fileDto = await useCase.handle(payload);
        await responder.sendStream(fileDto, reply, StatusCode.HTTP_OK);
    }

    static async optimize(request: any, reply: FastifyReply): Promise<void>
    {
        const payload = {
            id: request.params.id,
            ...request.query
        };

        const useCase = new OptimizeUseCase();
        const file = await useCase.handle(payload);

        void await responder.send(file, reply, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    static async updateBase64(request: any, reply: FastifyReply): Promise<void>
    {
        const { filename, base64 } = request.body;
        const partialBase64 = base64.split(';base64,');
        const _base64: string = partialBase64.pop();
        const mimeType = partialBase64.shift().split('data:').pop();
        const extension = filename.includes('.') ? filename.split('.').pop() : null;
        const { length } = Buffer.from(_base64.substring(_base64.indexOf(',') + 1));

        const payload: FileUpdateBase64Payload = {
            ...request.body,
            id: request.params.id,
            query: request.query,
            originalName: request.body.filename as string,
            base64: _base64,
            mimeType,
            extension,
            size: length,
            isImage: mimeType.includes('image')
        };

        const useCase = new UpdateFileBase64UseCase();
        const file: IFileDTO = await useCase.handle(payload);

        void await responder.send(file, reply, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    static async updateMultipart(request: any, reply: FastifyReply): Promise<void>
    {
        const { originalname, encoding, mimetype, destination, filename, size } = request.file;
        const { isOriginalName, isPublic, isOverwrite, isOptimize } = request.query;

        const payload = {
            id: request.params.id,
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

        const useCase = new UpdateFileMultipartUseCase();
        const response = await useCase.handle(payload);

        void await responder.send(response, reply, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    static async remove(request: any, reply: FastifyReply): Promise<void>
    {
        const payload = {
            id: request.params.id
        };

        const useCase = new RemoveFileUseCase();
        const file = await useCase.handle(payload);

        void await responder.send(file, reply, StatusCode.HTTP_CREATED, new FileTransformer());
    }
}

export default FileController;
