
interface CreateBucketPayload
{
    getBucketName(): string;
    getRegion(): string;
    getBucketPublicPolicy(): string;
    getBucketPrivatePolicy(): string;
}

export default CreateBucketPayload;
