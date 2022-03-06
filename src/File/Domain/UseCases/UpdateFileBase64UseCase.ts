import FileUpdateBase64Payload from '../Payloads/FileUpdateBase64Payload';
import IFileDomain from '../Entities/IFileDomain';
import FileService from '../Services/FileService';

class UpdateFileBase64UseCase
{
    private fileService = new FileService();

    async handle(payload: FileUpdateBase64Payload): Promise<any>
    {
        const id = payload.id;
        let file: IFileDomain = await this.fileService.getOne(id);
        file = await this.fileService.persist(file, payload);
        return await this.fileService.uploadFileBase64(file, payload);
    }
}

export default UpdateFileBase64UseCase;
