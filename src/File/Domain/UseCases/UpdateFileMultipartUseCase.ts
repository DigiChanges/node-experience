import FileUpdateMultipartPayload from '../../InterfaceAdapters/Payloads/FileUpdateMultipartPayload';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IFileService from '../../InterfaceAdapters/IFileService';

class UpdateFileMultipartUseCase
{
    @containerFactory(SERVICES.IFileService)
    private file_service: IFileService;

    async handle(payload: FileUpdateMultipartPayload): Promise<any>
    {
        const id = payload.getId();
        let file: IFileDomain = await this.file_service.getOne(id);
        file = await this.file_service.persist(file, payload);
        return await this.file_service.uploadFileMultipart(file, payload);
    }
}

export default UpdateFileMultipartUseCase;
