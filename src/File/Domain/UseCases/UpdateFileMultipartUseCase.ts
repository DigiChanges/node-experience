import FileUpdateMultipartPayload from '../Payloads/FileUpdateMultipartPayload';
import IFileDomain from '../Entities/IFileDomain';
import FileService from '../Services/FileService';

class UpdateFileMultipartUseCase
{
    private fileService = new FileService();

    async handle(payload: FileUpdateMultipartPayload): Promise<any>
    {
        const id = payload.getId();
        let file: IFileDomain = await this.fileService.getOne(id);
        file = await this.fileService.persist(file, payload);
        return await this.fileService.uploadFileMultipart(file, payload);
    }
}

export default UpdateFileMultipartUseCase;
