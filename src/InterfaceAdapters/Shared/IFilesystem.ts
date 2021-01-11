import internal from "stream";

interface IFilesystem
{
    listObjects(prefix?: string, recursive?: boolean ): Promise<any>;
    uploadFile(objectName: string, path: string): Promise<any>;
    uploadFileByBuffer(objectName: string, base64Data: string): Promise<any>;
    downloadFile(objectName: string): Promise<string>;
    downloadStreamFile(objectName: string): Promise<internal.Readable>;
    presignedGetObject(objectName: string, expiry?: number, respHeaders?: { [key: string]: any; }): Promise<string>;
    presignedPutObject(objectName: string, expiry?: number): Promise<string>;
    createBucket(bucketName: string, region?: string): Promise<void>;
    setBucketPolicy(bucketPolicy: string, bucketName?: string): Promise<void>;
    getClient(): any;
}

export default IFilesystem;