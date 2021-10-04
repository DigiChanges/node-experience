import FileMultipartRepPayload from '../../InterfaceAdapters/Payloads/FileMultipartRepPayload';
import FileService from '../Services/FileService';

class UploadMultipartUseCase
{
    private fileService = new FileService();

    async handle(payload: FileMultipartRepPayload): Promise<any>
    {
        return await this.fileService.uploadFileMultipart(payload);
    }
}

export default UploadMultipartUseCase;
