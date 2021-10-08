import FileBase64RepPayload from '../../InterfaceAdapters/Payloads/FileBase64RepPayload';
import FileService from '../Services/FileService';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import File from '../Entities/File';

class UploadBase64UseCase
{
    private file_service = new FileService();

    async handle(payload: FileBase64RepPayload): Promise<any>
    {
        let file: IFileDomain = new File();
        file = await this.file_service.persist(file, payload);
        return await this.file_service.upload_file_base64(file, payload);
    }
}

export default UploadBase64UseCase;
