import FileUpdateMultipartPayload from '../../InterfaceAdapters/Payloads/FileUpdateMultipartPayload';
import FileService from '../Services/FileService';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';


class UpdateFileMultipartUseCase
{
    private fileService = new FileService();

    async handle(payload: FileUpdateMultipartPayload): Promise<any>
    {
        const id = payload.get_id();
        let file: IFileDomain = await this.file_service.get_one(id);
        file = await this.file_service.persist(file, payload);
        return await this.file_service.upload_file_multipart(file, payload);
    }
}

export default UpdateFileMultipartUseCase;
