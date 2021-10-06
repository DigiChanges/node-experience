import FileUpdateBase64Payload from '../../InterfaceAdapters/Payloads/FileUpdateBase64Payload';
import FileService from '../Services/FileService';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';

class UpdateFileBase64UseCase
{
    private fileService = new FileService();

    async handle(payload: FileUpdateBase64Payload): Promise<any>
    {
        const id = payload.getId();
        let file: IFileDomain = await this.fileService.get_one(id);
        file = await this.fileService.persist(file, payload);
        return await this.fileService.uploadFileBase64(file, payload);
    }
}

export default UpdateFileBase64UseCase;
