import { Readable } from 'stream';
import { FileVersionPayload } from '../../../File/Domain/Payloads/FileVersionPayload';
import { ListObjectsPayload } from '../../../File/Domain/Payloads/ListObjectsPayload';

export abstract class IFilesystem
{
    abstract listObjects(payload: ListObjectsPayload): Promise<any>;
    abstract uploadFile(object: FileVersionPayload, path: string): Promise<any>;
    abstract uploadFileByBuffer(object: FileVersionPayload, base64Data: string): Promise<any>;
    abstract downloadFile(object: FileVersionPayload): Promise<string>;
    abstract downloadStreamFile(object: FileVersionPayload): Promise<Readable>;
    abstract presignedGetObject(object: FileVersionPayload, expiry?: number, respHeaders?: {
        [key: string]: any;
    }): Promise<string>;
    abstract presignedPutObject(objectPath: string, expiry?: number): Promise<string>;
    abstract createBucket(bucketName: string, region?: string): Promise<void>;
    abstract removeObjects(object: FileVersionPayload): Promise<void>;
    abstract setBucketPolicy(bucketPolicy: string, bucketName?: string): Promise<void>;
}
