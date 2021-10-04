import FileBase64RepPayload from '../../InterfaceAdapters/Payloads/FileBase64RepPayload';
import FileService from '../Services/FileService';

class UploadBase64UseCase
{
    private fileService = new FileService();

    async handle(payload: FileBase64RepPayload): Promise<any>
    {
        return await this.fileService.uploadFileBase64(payload);
    }
}

export default UploadBase64UseCase;
