import FileUpdateBase64Payload from '../../InterfaceAdapters/Payloads/FileUpdateBase64Payload';
import FileService from '../Services/FileService';


class UpdateFileBase64UseCase
{
    private fileService = new FileService();

    async handle(payload: FileUpdateBase64Payload): Promise<any>
    {
        return await this.fileService.updateFileBase64(payload);
    }
}

export default UpdateFileBase64UseCase;
