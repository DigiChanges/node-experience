import CreateBucketPayload from '../../InterfaceAdapters/Payloads/CreateBucketPayload';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IFileService from '../../InterfaceAdapters/IFileService';

class CreateBucketUseCase
{
    @containerFactory(SERVICES.IFileService)
    private file_service: IFileService;

    async handle(payload: CreateBucketPayload): Promise<void>
    {
        await this.file_service.createBucket(payload);
    }
}

export default CreateBucketUseCase;
