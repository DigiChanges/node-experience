import {ICriteria, IPaginator} from '@digichanges/shared-experience';

import ListFilesUseCase from '../../Domain/UseCases/ListFilesUseCase';
import ListObjectsUseCase from '../../Domain/UseCases/ListObjectsUseCase';
import UploadBase64UseCase from '../../Domain/UseCases/UploadBase64UseCase';
import DownloadUseCase from '../../Domain/UseCases/DownloadUseCase';
import GetPresignedGetObjectUseCase from '../../Domain/UseCases/GetPresignedGetObjectUseCase';
import UploadMultipartUseCase from '../../Domain/UseCases/UploadMultipartUseCase';
import ValidatorRequest from '../../../App/Presentation/Shared/Express/ValidatorRequest';
import IdRequest from '../../../App/Presentation/Requests/Express/IdRequest';
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

        const listFilesUseCase = new ListFilesUseCase();
        return await listFilesUseCase.handle(request);
    }

    public async listFilesystemObjects(request: ListObjectsPayload)
    {
        await ValidatorRequest.handle(request);

        const listObjectsUseCase = new ListObjectsUseCase();
        return await listObjectsUseCase.handle(request);
    }

    public async getFileMetadata(request: IdPayload)
    {
        await ValidatorRequest.handle(request);

        const getFileMetadataUserCase = new GetFileMetadataUserCase();

        return await getFileMetadataUserCase.handle(request);
    }

    public async uploadBase64(request: FileBase64RepPayload)
    {
        await ValidatorRequest.handle(request);

        const uploadBase64UseCase = new UploadBase64UseCase();
        return await uploadBase64UseCase.handle(request);
    }

    public async uploadMultipart(request: FileMultipartRepPayload)
    {
        await ValidatorRequest.handle(request);

        const uploadMultipartUseCase = new UploadMultipartUseCase();
        return await uploadMultipartUseCase.handle(request);
    }

    public async getPresignedGetObject(request: PresignedFileRepPayload)
    {
        await ValidatorRequest.handle(request);

        const getPresignedGetObjectUseCase = new GetPresignedGetObjectUseCase();
        return await getPresignedGetObjectUseCase.handle(request);
    }

    public async downloadStreamFile(request: IdRequest): Promise<IFileDTO>
    {
        await ValidatorRequest.handle(request);

        const downloadUseCase = new DownloadUseCase();

        return await downloadUseCase.handle(request);
    }

    public async updateBase64(request: FileUpdateBase64Payload): Promise<any>
    {
        await ValidatorRequest.handle(request);

        const updateFileBase64UseCase = new UpdateFileBase64UseCase();
        return await updateFileBase64UseCase.handle(request);
    }

    public async updateMultipart(request: FileUpdateMultipartPayload): Promise<any>
    {
        await ValidatorRequest.handle(request);

        const updateFileMultipartUseCase = new UpdateFileMultipartUseCase();
        return await updateFileMultipartUseCase.handle(request);
    }
}

export default FileController;
