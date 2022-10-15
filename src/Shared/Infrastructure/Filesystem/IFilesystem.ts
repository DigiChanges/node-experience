import IFileVersionDomain from '../../../File/Domain/Entities/IFileVersionDomain';
import { Readable } from 'stream';
import ListObjectsPayload from '../../../File/Domain/Payloads/ListObjectsPayload';

interface IFilesystem
{
    listObjects(payload: ListObjectsPayload): Promise<any>;
    uploadFile(object: IFileVersionDomain, path: string): Promise<any>;
    uploadFileByBuffer(object: IFileVersionDomain, base64Data: string): Promise<any>;
    downloadFile(object: IFileVersionDomain): Promise<string>;
    downloadStreamFile(object: IFileVersionDomain): Promise<Readable>;
    presignedGetObject(object: IFileVersionDomain, expiry?: number, respHeaders?: {
        [key: string]: any;
    }): Promise<string>;
    presignedPutObject(objectPath: string, expiry?: number): Promise<string>;
    createBucket(bucketName: string, region?: string): Promise<void>;
    removeObjects(object: IFileVersionDomain): Promise<void>;
    setBucketPolicy(bucketPolicy: string, bucketName?: string): Promise<void>;
    getClient(): any;
}

export default IFilesystem;
