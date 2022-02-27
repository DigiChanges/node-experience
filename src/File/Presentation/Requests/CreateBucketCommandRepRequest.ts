import { IsString } from 'class-validator';
import CreateBucketPayload from '../../Domain/Payloads/CreateBucketPayload';

class CreateBucketCommandRequest implements CreateBucketPayload
{
    @IsString()
    name: string;

    publicBucketPolicy: any;
    privateBucketPolicy: any;

    @IsString()
    region: string;

    constructor(env: any)
    {
        this.name = env.name;
        this.region = env.region;
        this.privateBucketPolicy = {
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

        this.publicBucketPolicy = {
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

    getName(): string
    {
        return this.name;
    }

    getPublicBucketPolicy(): string
    {
        return JSON.stringify(this.publicBucketPolicy);
    }

    getPrivateBucketPolicy(): string
    {
        return JSON.stringify(this.privateBucketPolicy);
    }

    getRegion(): string
    {
        return this.region;
    }
}

export default CreateBucketCommandRequest;
