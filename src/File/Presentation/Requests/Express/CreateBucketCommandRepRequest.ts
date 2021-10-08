import { IsString } from 'class-validator';
import CreateBucketPayload from '../../../InterfaceAdapters/Payloads/CreateBucketPayload';

// TODO: Refactor set policy
class CreateBucketCommandRequest implements CreateBucketPayload
{
    @IsString()
    bucketName: string;

    bucketPolicy: any;

    @IsString()
    region: string;

    constructor(env: any)
    {
        this.bucketName = env.bucketName;
        this.region = env.region;
        this.bucketPolicy = {
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: 'Allow',
                    Principal: { AWS: '*' },
                    Action: [
                        's3:GetBucketLocation',
                        's3:ListBucket',
                        's3:ListBucketMultipartUploads'
                    ],
                    Resource: `arn:aws:s3:::${this.bucketName}`
                },
                {
                    Effect: 'Allow',
                    Principal: { AWS: '*' },
                    Action: [
                        's3:GetObject',
                        's3:PutObject',
                        's3:DeleteObject',
                        's3:ListMultipartUploadParts',
                        's3:AbortMultipartUpload'
                    ],
                    Resource: `arn:aws:s3:::${this.bucketName}/*`
                }
            ]
        };
    }

    get_bucket_name(): string
    {
        return this.bucketName;
    }

    get_bucket_policy(): string
    {
        return JSON.stringify(this.bucketPolicy);
    }

    get_region(): string
    {
        return this.region;
    }
}

export default CreateBucketCommandRequest;
