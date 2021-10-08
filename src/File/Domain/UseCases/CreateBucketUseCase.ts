import CreateBucketPayload from '../../InterfaceAdapters/Payloads/CreateBucketPayload';
import FileService from '../Services/FileService';

class CreateBucketUseCase
{
    private file_service = new FileService();

    async handle(payload: CreateBucketPayload): Promise<void>
    {
        await this.file_service.create_bucket(payload);
    }
}

export default CreateBucketUseCase;
