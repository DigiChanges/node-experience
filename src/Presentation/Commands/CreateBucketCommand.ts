import { loggerCli } from "../../Infrastructure/Shared/Logger";
import commander from "commander";
import CreateBucketCommandRequest from "../Requests/Command/Requests/CreateBucketCommandRepRequest";
import CreateBucketPayload from "../../InterfaceAdapters/Payloads/FileSystem/CreateBucketPayload";
import FilesystemFactory from "../../Infrastructure/Factories/FilesystemFactory";

const CreateBucketCommand = new commander.Command('createBucket');

CreateBucketCommand
    .version('0.0.1')
    .description('Add bucket to the system')
    .option('-e, --bucketName <bucketName>','Name of the bucket')
    .option('-fn, --region <region>','Region of the bucket')
    .action(async (env: any) => {
        const request: CreateBucketPayload = new CreateBucketCommandRequest(env);

        const bucketName = request.getBucketName();
        const region = request.getRegion();
        const bucketPolicy = request.getBucketPolicy();

        const filesystem = FilesystemFactory.create();
        await filesystem.createBucket(bucketName, region);
        await filesystem.setBucketPolicy(bucketPolicy, bucketName);

        loggerCli.info('Bucket was created successfully');
    });

export default CreateBucketCommand;
