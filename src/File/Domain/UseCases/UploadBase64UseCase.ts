import FileBase64RepPayload from '../../InterfaceAdapters/Payloads/FileBase64RepPayload';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import File from '../Entities/File';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IFileService from '../../InterfaceAdapters/IFileService';

class UploadBase64UseCase
{
    @containerFactory(SERVICES.IFileService)
    private fileService: IFileService;

    async handle(payload: FileBase64RepPayload): Promise<any>
    {
        let file: IFileDomain = new File();
        file = await this.fileService.persist(file, payload);
        return await this.fileService.uploadFileBase64(file, payload);
    }
}

export default UploadBase64UseCase;
