import { ICriteria, IPaginator } from '@digichanges/shared-experience';

import ListFilesUseCase from '../../Domain/UseCases/ListFilesUseCase';
import ListObjectsUseCase from '../../Domain/UseCases/ListObjectsUseCase';
import UploadBase64UseCase from '../../Domain/UseCases/UploadBase64UseCase';
import DownloadUseCase from '../../Domain/UseCases/DownloadUseCase';
import GetPresignedGetObjectUseCase from '../../Domain/UseCases/GetPresignedGetObjectUseCase';
import UploadMultipartUseCase from '../../Domain/UseCases/UploadMultipartUseCase';
import ValidatorRequest from '../../../App/Presentation/Shared/ValidatorRequest';
import UpdateFileMultipartUseCase from '../../Domain/UseCases/UpdateFileMultipartUseCase';
import UpdateFileBase64UseCase from '../../Domain/UseCases/UpdateFileBase64UseCase';
import GetFileMetadataUserCase from '../../Domain/UseCases/GetFileMetadataUseCase';
import ListObjectsPayload from '../../InterfaceAdapters/Payloads/ListObjectsPayload';
import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import FileBase64RepPayload from '../../InterfaceAdapters/Payloads/FileBase64RepPayload';
import FileMultipartRepPayload from '../../InterfaceAdapters/Payloads/FileMultipartRepPayload';
import IFileDTO from '../../InterfaceAdapters/Payloads/IFileDTO';
import PresignedFileRepPayload from '../../InterfaceAdapters/Payloads/PresignedFileRepPayload';
import FileUpdateBase64Payload from '../../InterfaceAdapters/Payloads/FileUpdateBase64Payload';
import FileUpdateMultipartPayload from '../../InterfaceAdapters/Payloads/FileUpdateMultipartPayload';


class FileController
{
    public async list(request: ICriteria): Promise<IPaginator>
    {
        await ValidatorRequest.handle(request);

        const useCase = new ListFilesUseCase();
        return await useCase.handle(request);
    }

    public async listFilesystemObjects(request: ListObjectsPayload)
    {
        await ValidatorRequest.handle(request);

        const useCase = new ListObjectsUseCase();
        return await useCase.handle(request);
    }

    public async getFileMetadata(request: IdPayload)
    {
        await ValidatorRequest.handle(request);

        const useCase = new GetFileMetadataUserCase();

        return await useCase.handle(request);
    }

    public async uploadBase64(request: FileBase64RepPayload)
    {
        await ValidatorRequest.handle(request);

        const useCase = new UploadBase64UseCase();
        return await useCase.handle(request);
    }

    public async uploadMultipart(request: FileMultipartRepPayload)
    {
        await ValidatorRequest.handle(request);

        const useCase = new UploadMultipartUseCase();
        return await useCase.handle(request);
    }

    public async getPresignedGetObject(request: PresignedFileRepPayload)
    {
        await ValidatorRequest.handle(request);

        const useCase = new GetPresignedGetObjectUseCase();
        return await useCase.handle(request);
    }

    public async downloadStreamFile(request: IdPayload): Promise<IFileDTO>
    {
        await ValidatorRequest.handle(request);

        const useCase = new DownloadUseCase();

        return await useCase.handle(request);
    }

    public async updateBase64(request: FileUpdateBase64Payload): Promise<any>
    {
        await ValidatorRequest.handle(request);

        const useCase = new UpdateFileBase64UseCase();
        return await useCase.handle(request);
    }

    public async updateMultipart(request: FileUpdateMultipartPayload): Promise<any>
    {
        await ValidatorRequest.handle(request);

        const useCase = new UpdateFileMultipartUseCase();
        return await useCase.handle(request);
    }
}

export default FileController;
