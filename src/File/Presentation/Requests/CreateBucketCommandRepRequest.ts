import { IsString } from 'class-validator';
import CreateBucketPayload from '../../InterfaceAdapters/Payloads/CreateBucketPayload';

class CreateBucketCommandRequest implements CreateBucketPayload
{
    @IsString()
    bucketName: string;

    bucketPublicPolicy: any;

    bucketPrivatePolicy: any;

    @IsString()
    region: string;

    constructor(env: any)
    {
        this.bucketName = env.bucketName;
        this.region = env.region;
        this.bucketPrivatePolicy = {
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: 'Allow',
                    Principal: { AWS: '*' },
                    Action: [
                        's3:GetBucketLocation'
                    ],
                    Resource: 'arn:aws:s3:::*'
                }
            ]
        };

        this.bucketPublicPolicy = {
            Version: '2012-10-17',
            Statement: [
                {
                    Effect: 'Allow',
                    Principal: { AWS: '*' },
                    Action: [
                        's3:GetBucketLocation',
                        's3:ListBucket',
                        's3:GetObject'
                    ],
                    Resource: [
                        'arn:aws:s3:::*'
                    ]
                }
            ]
        };
    }

    getBucketName(): string
    {
        return this.bucketName;
    }

    getBucketPublicPolicy(): string
    {
        return JSON.stringify(this.bucketPublicPolicy);
    }

    getBucketPrivatePolicy(): string
    {
        return JSON.stringify(this.bucketPrivatePolicy);
    }

    getRegion(): string
    {
        return this.region;
    }
}

export default CreateBucketCommandRequest;
