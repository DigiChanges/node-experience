import CreateBucketPayload from '../Payloads/CreateBucketPayload';
import FileService from '../Services/FileService';

class CreateBucketUseCase
{
    #fileService = new FileService();

    async handle(payload: CreateBucketPayload): Promise<void>
    {
        await this.#fileService.createBucket(payload);
    }
}

export default CreateBucketUseCase;
