import FileUpdateBase64Payload from '../../InterfaceAdapters/Payloads/FileUpdateBase64Payload';
import FileService from '../Services/FileService';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IFileService from '../../InterfaceAdapters/IFileService';

class UpdateFileBase64UseCase
{
    @containerFactory(SERVICES.IFileService)
    private file_service: IFileService;

    async handle(payload: FileUpdateBase64Payload): Promise<any>
    {
        const id = payload.getId();
        let file: IFileDomain = await this.file_service.getOne(id);
        file = await this.file_service.persist(file, payload);
        return await this.file_service.uploadFileBase64(file, payload);
    }
}

export default UpdateFileBase64UseCase;
