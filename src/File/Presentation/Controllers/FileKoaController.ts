import { RequestCriteria, ICriteria, IPaginator, StatusCode } from '@digichanges/shared-experience';
import KoaResponder from '../../../Main/Presentation/Utils/KoaResponder';
import FileVersionTransformer from '../Transformers/FileVersionTransformer';
import ObjectTransformer from '../Transformers/ObjectTransformer';
import FileTransformer from '../Transformers/FileTransformer';
import FileFilter from '../Criterias/FileFilter';
import FileSort from '../Criterias/FileSort';
import Pagination from '../../../Shared/Utils/Pagination';
import ListFilesUseCase from '../../Domain/UseCases/ListFilesUseCase';
import ListObjectsUseCase from '../../Domain/UseCases/ListObjectsUseCase';
import GetFileMetadataUseCase from '../../Domain/UseCases/GetFileMetadataUseCase';
import ValidatorSchema from '../../../Main/Presentation/Utils/ValidatorSchema';
import FileBase64RepPayload from '../../Domain/Payloads/FileBase64RepPayload';
import FileBase64SchemaValidation from '../Validations/FileBase64SchemaValidation';
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
import IFileVersionDomain from '../../Domain/Entities/IFileVersionDomain';

const responder: KoaResponder = new KoaResponder();

class FileController
{
    static async listFiles(ctx: any): Promise<void>
    {
        const { query, url } = ctx.request;

        const requestCriteria: ICriteria = new RequestCriteria({
            filter: new FileFilter(query),
            sort: new FileSort(query),
            pagination: new Pagination(query, url)
        });

        const useCase = new ListFilesUseCase();
        const paginator: IPaginator = await useCase.handle(requestCriteria);

        await responder.paginate<IFileVersionDomain>(paginator, ctx, StatusCode.HTTP_OK, new FileVersionTransformer());
    }

    static async listObjects(ctx: any): Promise<void>
    {
        const { query } = ctx.request;

        const payload = {
            ...query,
            recursive: query.recursive ? String(query.recursive) : undefined,
            prefix: query.prefix ? String(query.prefix) : undefined
        };

        const useCase = new ListObjectsUseCase();
        const objects = await useCase.handle(payload);

        void await responder.send(objects, ctx, StatusCode.HTTP_OK, new ObjectTransformer());
    }

    static async getFileMetadata(ctx: any): Promise<void>
    {
        const payload = {
            id: ctx.params.id
        };

        const useCase = new GetFileMetadataUseCase();
        const file = await useCase.handle(payload);

        void await responder.send(file, ctx, StatusCode.HTTP_OK, new FileTransformer());
    }

    static async uploadBase64(ctx: any): Promise<void>
    {
        const { filename, base64 } = ctx.request.body;
        const partialBase64 = base64.split(';base64,');
        const _base64: string = partialBase64.pop();
        const mimeType = partialBase64.shift().split('data:').pop();
        const extension = filename.includes('.') ? filename.split('.').pop() : null;
        const { length } = Buffer.from(_base64.substring(_base64.indexOf(',') + 1));

        const payload = {
            ...ctx.request.body,
            query: ctx.query,
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
        const file = await useCase.handle(cleanData as FileBase64RepPayload);

        void await responder.send(file, ctx, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    static async uploadMultipart(ctx: any): Promise<void>
    {
        const { originalname, encoding, mimetype, destination, filename, size } = ctx.request.file;
        const { isOriginalName, isPublic, isOverwrite, isOptimize } = ctx.request.query;

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
        const file = await useCase.handle(payload);

        void await responder.send(file, ctx, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    static async getPresignedGetObject(ctx: any): Promise<void>
    {
        const payload: PresignedFileRepPayload = {
            ...ctx.request.body,
            query: ctx.query
        };

        const useCase = new GetPresignedGetObjectUseCase();
        const presignedGetObject = await useCase.handle(payload);

        void await responder.send({ presignedGetObject }, ctx, StatusCode.HTTP_OK, null);
    }

    static async download(ctx: any): Promise<void>
    {
        const payload = {
            id: ctx.params.id,
            version: ctx.query?.version ? +ctx.query.version : null
        };

        const useCase = new DownloadUseCase();
        const fileDto = await useCase.handle(payload);

        responder.sendStream(fileDto, ctx, StatusCode.HTTP_OK);
    }

    static async optimize(ctx: any): Promise<void>
    {
        const payload = {
            id: ctx.params.id,
            ...ctx.query
        };

        const useCase = new OptimizeUseCase();
        const file = await useCase.handle(payload);

        void await responder.send(file, ctx, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    static async updateBase64(ctx: any): Promise<void>
    {
        const { filename, base64 } = ctx.request.body;
        const partialBase64 = base64.split(';base64,');
        const _base64: string = partialBase64.pop();
        const mimeType = partialBase64.shift().split('data:').pop();
        const extension = filename.includes('.') ? filename.split('.').pop() : null;
        const { length } = Buffer.from(_base64.substring(_base64.indexOf(',') + 1));

        const payload: FileUpdateBase64Payload = {
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

        const useCase = new UpdateFileBase64UseCase();
        const file: IFileDTO = await useCase.handle(payload);

        void await responder.send(file, ctx, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    static async updateMultipart(ctx: any): Promise<void>
    {
        const { originalname, encoding, mimetype, destination, filename, size } = ctx.request.file;
        const { isOriginalName, isPublic, isOverwrite, isOptimize } = ctx.request.query;

        const payload = {
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

        const useCase = new UpdateFileMultipartUseCase();
        const response = await useCase.handle(payload);

        void await responder.send(response, ctx, StatusCode.HTTP_CREATED, new FileTransformer());
    }

    static async remove(ctx: any): Promise<void>
    {
        const payload = {
            id: ctx.params.id
        };

        const useCase = new RemoveFileUseCase();
        const file = await useCase.handle(payload);

        void await responder.send(file, ctx, StatusCode.HTTP_CREATED, new FileTransformer());
    }
}

export default FileController;
