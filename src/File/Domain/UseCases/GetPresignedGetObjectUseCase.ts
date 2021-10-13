import PresignedFileRepPayload from '../../InterfaceAdapters/Payloads/PresignedFileRepPayload';
import FileService from '../Services/FileService';

class GetPresignedGetObjectUseCase
{
    private file_service = new FileService();

    async handle(payload: PresignedFileRepPayload): Promise<string>
    {
        return this.file_service.get_presigned_get_object(payload);
    }
}

export default GetPresignedGetObjectUseCase;
