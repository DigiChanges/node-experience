
interface CreateBucketPayload
{
    getName(): string;
    getRegion(): string;
    getPublicBucketPolicy(): string;
    getPrivateBucketPolicy(): string;
}

export default CreateBucketPayload;
