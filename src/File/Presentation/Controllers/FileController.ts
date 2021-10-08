import { ICriteria, IPaginator } from '@digichanges/shared-experience';

import ListFilesUseCase from '../../Domain/UseCases/ListFilesUseCase';
import ListObjectsUseCase from '../../Domain/UseCases/ListObjectsUseCase';
import UploadBase64UseCase from '../../Domain/UseCases/UploadBase64UseCase';
import DownloadUseCase from '../../Domain/UseCases/DownloadUseCase';
import GetPresignedGetObjectUseCase from '../../Domain/UseCases/GetPresignedGetObjectUseCase';
import UploadMultipartUseCase from '../../Domain/UseCases/UploadMultipartUseCase';
import ValidatorRequest from '../../../App/Presentation/Shared/Express/ValidatorRequest';
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

        const use_case = new ListFilesUseCase();
        return await use_case.handle(request);
    }

    public async list_filesystem_objects(request: ListObjectsPayload)
    {
        await ValidatorRequest.handle(request);

        const use_case = new ListObjectsUseCase();
        return await use_case.handle(request);
    }

    public async get_file_metadata(request: IdPayload)
    {
        await ValidatorRequest.handle(request);

        const use_case = new GetFileMetadataUserCase();

        return await use_case.handle(request);
    }

    public async upload_base64(request: FileBase64RepPayload)
    {
        await ValidatorRequest.handle(request);

        const use_case = new UploadBase64UseCase();
        return await use_case.handle(request);
    }

    public async upload_multipart(request: FileMultipartRepPayload)
    {
        await ValidatorRequest.handle(request);

        const use_case = new UploadMultipartUseCase();
        return await use_case.handle(request);
    }

    public async get_presigned_get_object(request: PresignedFileRepPayload)
    {
        await ValidatorRequest.handle(request);

        const use_case = new GetPresignedGetObjectUseCase();
        return await use_case.handle(request);
    }

    public async download_stream_file(request: IdPayload): Promise<IFileDTO>
    {
        await ValidatorRequest.handle(request);

        const use_case = new DownloadUseCase();

        return await use_case.handle(request);
    }

    public async update_base64(request: FileUpdateBase64Payload): Promise<any>
    {
        await ValidatorRequest.handle(request);

        const use_case = new UpdateFileBase64UseCase();
        return await use_case.handle(request);
    }

    public async update_multipart(request: FileUpdateMultipartPayload): Promise<any>
    {
        await ValidatorRequest.handle(request);

        const use_case = new UpdateFileMultipartUseCase();
        return await use_case.handle(request);
    }
}

export default FileController;
