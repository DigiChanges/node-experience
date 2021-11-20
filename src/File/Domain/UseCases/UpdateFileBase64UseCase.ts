import FileUpdateBase64Payload from '../../InterfaceAdapters/Payloads/FileUpdateBase64Payload';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import FileService from '../Services/FileService';

class UpdateFileBase64UseCase
{
    private fileService = new FileService();

    async handle(payload: FileUpdateBase64Payload): Promise<any>
    {
        const id = payload.getId();
        let file: IFileDomain = await this.fileService.getOne(id);
        file = await this.fileService.persist(file, payload);
        return await this.fileService.uploadFileBase64(file, payload);
    }
}

export default UpdateFileBase64UseCase;
