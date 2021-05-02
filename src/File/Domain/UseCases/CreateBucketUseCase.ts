import CreateBucketPayload from '../../InterfaceAdapters/Payloads/CreateBucketPayload';
import {REPOSITORIES} from '../../../repositories';
import IFileRepository from '../../InterfaceAdapters/IFileRepository';
import {containerFactory} from '../../../Shared/Decorators/ContainerFactory';
import FilesystemFactory from '../../../Shared/Factories/FilesystemFactory';

class CreateBucketUseCase
{
    @containerFactory(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    async handle(payload: CreateBucketPayload): Promise<void>
    {
        const bucketName = payload.getBucketName();
        const region = payload.getRegion();
        const bucketPolicy = payload.getBucketPolicy();

        const filesystem = FilesystemFactory.create();
        await filesystem.createBucket(bucketName, region);
        await filesystem.setBucketPolicy(bucketPolicy, bucketName);
    }
}

export default CreateBucketUseCase;
