
interface CreateBucketPayload
{
    name: string;
    region: string;
    publicBucketPolicy: string;
    privateBucketPolicy: string;
}

export default CreateBucketPayload;
