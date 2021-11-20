import internal from 'stream';
import { IFilesystem } from '@digichanges/shared-experience';

class MockMinioStrategy implements IFilesystem
{
    private readonly filesystem: string;
    private readonly pathTemp: string;

    constructor()
    {
        this.pathTemp = '/tmp/';
        this.filesystem = 'filesystem';
    }

    async presignedGetObject(objectName: string, expiry: number, respHeaders?: { [key: string]: any; }): Promise<string>
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

    async uploadFile(objectName: string, path: string): Promise<string>
    {
        return new Promise<string>((resolve) => resolve('success'));
    }

    async uploadFileByBuffer(objectName: string, base64Data: string)
    {
        return new Promise<string>((resolve) => resolve('success'));
    }

    async downloadFile(objectName: string): Promise<string>
    {
        return new Promise<string>((resolve) => resolve('success'));
    }

    async downloadStreamFile(objectName: string): Promise<internal.Readable>
    {
        return new Promise<internal.Readable>((resolve) => resolve(new internal.Readable()));
    }

    async listObjects(prefix?: string, recursive?: boolean)
    {
        return new Promise((resolve) => resolve('success'));
    }

    async removeObjects(objectName: string): Promise<void>
    {
        return new Promise<void>((resolve) => resolve);
    }

    getClient(): any
    {
        return this.filesystem;
    }
}

export default MockMinioStrategy;
