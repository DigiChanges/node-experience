import PresignedFileRepPayload from '../Payloads/PresignedFileRepPayload';
import FileService from '../Services/FileService';

class GetPresignedGetObjectUseCase
{
    private fileService = new FileService();

    async handle(payload: PresignedFileRepPayload): Promise<string>
    {
        return this.fileService.getPresignedGetObject(payload);
    }
}

export default GetPresignedGetObjectUseCase;
