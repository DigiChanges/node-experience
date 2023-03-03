import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

import ListFilesUseCase from '../../Domain/UseCases/ListFilesUseCase';
import ListObjectsUseCase from '../../Domain/UseCases/ListObjectsUseCase';
import UploadBase64UseCase from '../../Domain/UseCases/UploadBase64UseCase';
import DownloadUseCase from '../../Domain/UseCases/DownloadUseCase';
import GetPresignedGetObjectUseCase from '../../Domain/UseCases/GetPresignedGetObjectUseCase';
import UploadMultipartUseCase from '../../Domain/UseCases/UploadMultipartUseCase';
import ValidatorSchema from '../../../Shared/Presentation/Shared/ValidatorSchema';
import UpdateFileMultipartUseCase from '../../Domain/UseCases/UpdateFileMultipartUseCase';
import UpdateFileBase64UseCase from '../../Domain/UseCases/UpdateFileBase64UseCase';
import GetFileMetadataUserCase from '../../Domain/UseCases/GetFileMetadataUseCase';
import ListObjectsPayload from '../../Domain/Payloads/ListObjectsPayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import FileBase64RepPayload from '../../Domain/Payloads/FileBase64RepPayload';
import FileMultipartRepPayload from '../../Domain/Payloads/FileMultipartRepPayload';
import PresignedFileRepPayload from '../../Domain/Payloads/PresignedFileRepPayload';
import FileUpdateBase64Payload from '../../Domain/Payloads/FileUpdateBase64Payload';
import FileUpdateMultipartPayload from '../../Domain/Payloads/FileUpdateMultipartPayload';
import RemoveFileUseCase from '../../Domain/UseCases/RemoveFileUseCase';
import IFileVersionDTO from '../../Domain/Models/IFileVersionDTO';
import IFileDTO from '../../Domain/Models/IFileDTO';
import OptimizeUseCase from '../../Domain/UseCases/OptimizeUseCase';
import OptimizePayload from '../../Domain/Payloads/OptimizePayload';
import DownloadSchemaValidation from '../Validations/DownloadSchemaValidation';
import FileBase64SchemaValidation from '../Validations/FileBase64SchemaValidation';
import FileBase64UpdateSchemaValidation from '../Validations/FileBase64UpdateSchemaValidation';
import DownloadPayload from '../../Domain/Payloads/DownloadPayload';
import FileMultipartSchemaValidation from '../Validations/FileMultipartSchemaValidation';
import CriteriaSchemaValidation from '../../../Shared/Presentation/Validations/CriteriaSchemaValidation';
import CriteriaPayload from '../../../Shared/Presentation/Validations/CriteriaPayload';
import RequestCriteria from '../../../Shared/Presentation/Requests/RequestCriteria';
import FileFilter from '../Criterias/FileFilter';
import FileSort from '../Criterias/FileSort';
import Pagination from '../../../Shared/Presentation/Shared/Pagination';
import ListObjectsSchemaValidation from '../Validations/ListObjectsSchemaValidation';
import IdSchemaValidation from '../../../Shared/Presentation/Validations/IdSchemaValidation';
import OptimizeSchemaValidation from '../Validations/OptimizeSchemaValidation';
import PresignedFileSchemaValidation from '../Validations/PresignedFileSchemaValidation';
import FileMultipartUpdateSchemaValidation from '../Validations/FileMultipartUpdateSchemaValidation';

class FileController
{
    public async list(payload: CriteriaPayload): Promise<IPaginator>
    {
        await ValidatorSchema.handle(CriteriaSchemaValidation, payload);

        const requestCriteria: ICriteria = new RequestCriteria(
            {
                filter: new FileFilter(payload.query),
                sort: new FileSort(payload.query),
                pagination: new Pagination(payload.query, payload.url)
            });

        const useCase = new ListFilesUseCase();
        return await useCase.handle(requestCriteria);
    }

    public async listFilesystemObjects(payload: ListObjectsPayload): Promise<any>
    {
        await ValidatorSchema.handle(ListObjectsSchemaValidation, payload);

        const useCase = new ListObjectsUseCase();
        return await useCase.handle(payload);
    }

    public async getFileMetadata(payload: IdPayload): Promise<IFileDTO>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const useCase = new GetFileMetadataUserCase();
        return await useCase.handle(payload);
    }

    public async uploadBase64(payload: FileBase64RepPayload): Promise<any>
    {
        const cleanData = await ValidatorSchema.handle<FileBase64RepPayload>(FileBase64SchemaValidation, payload);

        const useCase = new UploadBase64UseCase();
        return await useCase.handle(cleanData as FileBase64RepPayload);
    }

    public async optimize(payload: OptimizePayload): Promise<any>
    {
        await ValidatorSchema.handle(OptimizeSchemaValidation, payload);

        const useCase = new OptimizeUseCase();
        return await useCase.handle(payload);
    }

    public async  uploadMultipart(payload: FileMultipartRepPayload): Promise<any>
    {
        await ValidatorSchema.handle(FileMultipartSchemaValidation, payload);

        const useCase = new UploadMultipartUseCase();
        return await useCase.handle(payload);
    }

    public async getPresignedGetObject(payload: PresignedFileRepPayload): Promise<string>
    {
        await ValidatorSchema.handle(PresignedFileSchemaValidation, payload);

        const useCase = new GetPresignedGetObjectUseCase();
        return await useCase.handle(payload);
    }

    public async downloadStreamFile(payload: DownloadPayload): Promise<IFileVersionDTO>
    {
        await ValidatorSchema.handle(DownloadSchemaValidation, payload);

        const useCase = new DownloadUseCase();
        return await useCase.handle(payload);
    }

    public async updateBase64(payload: FileUpdateBase64Payload): Promise<any>
    {
        await ValidatorSchema.handle(FileBase64UpdateSchemaValidation, payload);

        const useCase = new UpdateFileBase64UseCase();
        return await useCase.handle(payload);
    }

    public async updateMultipart(payload: FileUpdateMultipartPayload): Promise<any>
    {
        await ValidatorSchema.handle(FileMultipartUpdateSchemaValidation, payload);

        const useCase = new UpdateFileMultipartUseCase();
        return await useCase.handle(payload);
    }

    public async removeFile(payload: IdPayload): Promise<IFileDTO>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const useCase = new RemoveFileUseCase();
        return await useCase.handle(payload);
    }
}

export default FileController;
