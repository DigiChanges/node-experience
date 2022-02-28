import IFileDomain from '../../File/Domain/Entities/IFileDomain';
import { Readable } from 'stream';
import ListObjectsPayload from '../../File/Domain/Payloads/ListObjectsPayload';

interface IFilesystem
{
    listObjects(payload: ListObjectsPayload): Promise<any>;
    uploadFile(object: IFileDomain, path: string): Promise<any>;
    uploadFileByBuffer(object: IFileDomain, base64Data: string): Promise<any>;
    downloadFile(objectName: string): Promise<string>;
    downloadStreamFile(object: IFileDomain): Promise<Readable>;
    presignedGetObject(object: IFileDomain, expiry?: number, respHeaders?: {
        [key: string]: any;
    }): Promise<string>;
    presignedPutObject(objectName: string, expiry?: number): Promise<string>;
    createBucket(bucketName: string, region?: string): Promise<void>;
    removeObjects(object: IFileDomain): Promise<void>;
    setBucketPolicy(bucketPolicy: string, bucketName?: string): Promise<void>;
    getClient(): any;
}

export default IFilesystem;
