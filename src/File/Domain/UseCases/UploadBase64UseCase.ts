import FileBase64RepPayload from '../../InterfaceAdapters/Payloads/FileBase64RepPayload';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import File from '../Entities/File';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IFileService from '../../InterfaceAdapters/IFileService';

class UploadBase64UseCase
{
    @containerFactory(SERVICES.IFileService)
    private file_service: IFileService;

    async handle(payload: FileBase64RepPayload): Promise<any>
    {
        let file: IFileDomain = new File();
        file = await this.file_service.persist(file, payload);
        return await this.file_service.uploadFileBase64(file, payload);
    }
}

export default UploadBase64UseCase;
