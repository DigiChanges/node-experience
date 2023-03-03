import internal from 'stream';
import IFilesystem from '../../Shared/Infrastructure/Filesystem/IFilesystem';
import IFileVersionDomain from '../Domain/Entities/IFileVersionDomain';
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

    async presignedGetObject(object: IFileVersionDomain, expiry: number, respHeaders?: { [key: string]: any; }): Promise<string>
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

    async uploadFile(object: IFileVersionDomain, path: string): Promise<string>
    {
        return new Promise<string>((resolve) => resolve('success'));
    }

    async uploadFileByBuffer(object: IFileVersionDomain, base64Data: string)
    {
        return new Promise<string>((resolve) => resolve('success'));
    }

    async downloadFile(object: IFileVersionDomain): Promise<string>
    {
        return new Promise<string>((resolve) => resolve('success'));
    }

    async downloadStreamFile(object: IFileVersionDomain): Promise<internal.Readable>
    {
        return new Promise<internal.Readable>((resolve) => resolve(new internal.Readable()));
    }

    async listObjects(payload: ListObjectsPayload)
    {
        return new Promise((resolve) => resolve('success'));
    }

    async removeObjects(object: IFileVersionDomain): Promise<void>
    {
        return new Promise<void>((resolve) => resolve);
    }

    getClient(): any
    {
        return this.filesystem;
    }
}

export default MockMinioStrategy;
