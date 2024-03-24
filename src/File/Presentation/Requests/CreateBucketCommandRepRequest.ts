import CreateBucketPayload from '../../Domain/Payloads/CreateBucketPayload';

interface CreateBucketCommandProps
{
    name: string;
    region: string;
}

interface IStatementPolicy
{
    Effect: string;
    Principal: Record<string, string>;
    Action: string[];
    Resource: string[];
}

interface IBucketPolicy
{
    Version: string;
    Statement: IStatementPolicy[];
}

class CreateBucketCommandRequest implements CreateBucketPayload
{
    private readonly _name: string;
    private readonly _publicBucketPolicy: IBucketPolicy;
    private readonly _privateBucketPolicy: IBucketPolicy;
    private readonly _region: string;

    constructor(env: CreateBucketCommandProps)
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
                    Resource: ['arn:aws:s3:::*']
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
