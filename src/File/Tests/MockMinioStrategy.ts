import internal from 'stream';
import IFilesystem from '../../Shared/InterfaceAdapters/IFilesystem';
import IFileDomain from '../Domain/Entities/IFileDomain';
import ListObjectsPayload from '../Domain/Payloads/ListObjectsPayload';

class MockMinioStrategy implements IFilesystem
{
    private readonly filesystem: string;
    private readonly pathTemp: string;

    constructor()
    {
        this.pathTemp = '/tmp/';
        this.filesystem = 'filesystem';
    }

    async presignedGetObject(object: IFileDomain, expiry: number, respHeaders?: { [key: string]: any; }): Promise<string>
    {
        return new Promise<string>((resolve) => resolve('success'));
    }

    async presignedPutObject(objectName: string, expiry: number): Promise<string>
    {
        return new Promise<string>((resolve) => resolve('success'));
    }

    async createBucket(bucketName: string, region?: string): Promise<void>
    {
        return new Promise<void>((resolve) => resolve);
    }

    async setBucketPolicy(bucketPolicy: string, bucketName?: string): Promise<void>
    {
        return new Promise<void>((resolve) => resolve);
    }

    async uploadFile(object: IFileDomain, path: string): Promise<string>
    {
        return new Promise<string>((resolve) => resolve('success'));
    }

    async uploadFileByBuffer(object: IFileDomain, base64Data: string)
    {
        return new Promise<string>((resolve) => resolve('success'));
    }

    async downloadFile(objectName: string): Promise<string>
    {
        return new Promise<string>((resolve) => resolve('success'));
    }

    async downloadStreamFile(object: IFileDomain): Promise<internal.Readable>
    {
        return new Promise<internal.Readable>((resolve) => resolve(new internal.Readable()));
    }

    async listObjects(payload: ListObjectsPayload)
    {
        return new Promise((resolve) => resolve('success'));
    }

    async removeObjects(object: IFileDomain): Promise<void>
    {
        return new Promise<void>((resolve) => resolve);
    }

    getClient(): any
    {
        return this.filesystem;
    }
}

export default MockMinioStrategy;
