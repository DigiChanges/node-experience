import CreateBucketPayload from '../Payloads/CreateBucketPayload';
import FileService from '../Services/FileService';

class CreateBucketUseCase
{
    constructor(private fileService: FileService)
    {}

    async handle(payload: CreateBucketPayload): Promise<void>
    {
        await this.fileService.createBucket(payload);
    }
}

export default CreateBucketUseCase;
