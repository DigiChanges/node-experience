import Logger from '../../../Shared/Helpers/Logger';
import commander from 'commander';
import CreateBucketCommandRequest from '../Requests/CreateBucketCommandRepRequest';
import CreateBucketPayload from '../../Domain/Payloads/CreateBucketPayload';
import CreateBucketUseCase from '../../Domain/UseCases/CreateBucketUseCase';

const CreateBucketCommand = new commander.Command('createBucket');

CreateBucketCommand
    .version('0.0.1')
    .description('Add bucket to the system')
    .option('-b, --name <name>', 'Bucket name')
    .option('-r, --region <region>', 'Bucket region')
    .action(async(env: any) =>
    {
        const useCase = new CreateBucketUseCase();
        const request: CreateBucketPayload = new CreateBucketCommandRequest(env);

        await useCase.handle(request);

        Logger.info('Bucket was created successfully');
    });

export default CreateBucketCommand;
