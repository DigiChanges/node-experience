
interface CreateBucketPayload
{
    get_bucket_name(): string,
    get_region(): string,
    get_bucket_policy(): string,
}

export default CreateBucketPayload;
