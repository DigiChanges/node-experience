import FileUpdateMultipartPayload from '../../InterfaceAdapters/Payloads/FileUpdateMultipartPayload';
import FileService from '../Services/FileService';

class UpdateFileMultipartUseCase
{
    private fileService = new FileService();

    async handle(payload: FileUpdateMultipartPayload): Promise<any>
    {
        return await this.fileService.updateFileMultipart(payload);
    }
}

export default UpdateFileMultipartUseCase;
