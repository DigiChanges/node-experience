import CreateBucketPayload from '../../Domain/Payloads/CreateBucketPayload';

class CreateBucketCommandRequest implements CreateBucketPayload
{
    private readonly _name: string;
    private readonly _publicBucketPolicy: any;
    private readonly _privateBucketPolicy: any;
    private readonly _region: string;

    constructor(env: any)
    {
        this._name = env.name;
        this._region = env.region;
        this._privateBucketPolicy = {
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
        this._publicBucketPolicy = {
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

    get name(): string
    {
        return this._name;
    }

    get publicBucketPolicy(): string
    {
        return JSON.stringify(this._publicBucketPolicy);
    }

    get privateBucketPolicy(): string
    {
        return JSON.stringify(this._privateBucketPolicy);
    }

    get region(): string
    {
        return this._region;
    }
}

export default CreateBucketCommandRequest;
