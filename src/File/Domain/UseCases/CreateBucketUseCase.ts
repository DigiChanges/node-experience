import CreateBucketPayload from '../../InterfaceAdapters/Payloads/CreateBucketPayload';
import FileService from '../Services/FileService';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';

class CreateBucketUseCase
{
    @containerFactory(SERVICES.IFileService)
    private fileService: FileService;

    async handle(payload: CreateBucketPayload): Promise<void>
    {
        await this.fileService.createBucket(payload);
    }
}

export default CreateBucketUseCase;
