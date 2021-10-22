import FileMultipartRepPayload from '../../InterfaceAdapters/Payloads/FileMultipartRepPayload';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import File from '../Entities/File';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IFileService from '../../InterfaceAdapters/IFileService';

class UploadMultipartUseCase
{
    @containerFactory(SERVICES.IFileService)
    private file_service: IFileService;

    async handle(payload: FileMultipartRepPayload): Promise<any>
    {
        let file: IFileDomain = new File();
        file = await this.file_service.persist(file, payload);
        return await this.file_service.uploadFileMultipart(file, payload);
    }
}

export default UploadMultipartUseCase;
