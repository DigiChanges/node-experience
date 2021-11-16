import FileUpdateBase64Payload from '../../InterfaceAdapters/Payloads/FileUpdateBase64Payload';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IFileService from '../../InterfaceAdapters/IFileService';

class UpdateFileBase64UseCase
{
    @containerFactory(SERVICES.IFileService)
    private fileService: IFileService;

    async handle(payload: FileUpdateBase64Payload): Promise<any>
    {
        const id = payload.getId();
        let file: IFileDomain = await this.fileService.getOne(id);
        file = await this.fileService.persist(file, payload);
        return await this.fileService.uploadFileBase64(file, payload);
    }
}

export default UpdateFileBase64UseCase;
