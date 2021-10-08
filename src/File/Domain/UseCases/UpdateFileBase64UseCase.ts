import FileUpdateBase64Payload from '../../InterfaceAdapters/Payloads/FileUpdateBase64Payload';
import FileService from '../Services/FileService';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';

class UpdateFileBase64UseCase
{
    private file_service = new FileService();

    async handle(payload: FileUpdateBase64Payload): Promise<any>
    {
        const id = payload.get_id();
        let file: IFileDomain = await this.file_service.get_one(id);
        file = await this.file_service.persist(file, payload);
        return await this.file_service.upload_file_base64(file, payload);
    }
}

export default UpdateFileBase64UseCase;
