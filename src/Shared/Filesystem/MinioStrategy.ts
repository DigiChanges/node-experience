import { Client } from 'minio';
import internal from 'stream';
import { IFilesystem } from '@digichanges/shared-experience';

class MinioStrategy implements IFilesystem
{
    private readonly filesystem: Client = null;
    private readonly bucketName: string;
    private readonly pathTemp: string;
    private readonly region: string;

    constructor(_config: any)
    {
        this.bucketName = _config.bucket;
        this.region = _config.region;
        this.pathTemp = '/tmp/';

        this.filesystem = new Client({
            endPoint: _config.endPoint,
            accessKey: _config.accessKey,
            secretKey: _config.secretKey,
            region: _config.region,
            port: Number(_config.port),
            useSSL: _config.useSSL === 'true'
        });
    }

    async presignedGetObject(objectName: string, expiry: number, respHeaders?: { [key: string]: any; }): Promise<string>
    {
        return await this.filesystem.presignedGetObject(this.bucketName, objectName, expiry, respHeaders);
    }

    async presignedPutObject(objectName: string, expiry: number): Promise<string>
    {
        return await this.filesystem.presignedPutObject(this.bucketName, objectName, expiry);
    }

    async createBucket(bucketName: string, region?: string): Promise<void>
    {
        return await this.filesystem.makeBucket(bucketName || this.bucketName, region || this.region);
    }

    async setBucketPolicy(bucketPolicy: string, bucketName?: string): Promise<void>
    {
        return await this.filesystem.setBucketPolicy(bucketName || this.bucketName, bucketPolicy);
    }

    async uploadFile(objectName: string, path: string)
    {
        return await this.filesystem.fPutObject(this.bucketName, objectName, path, {});
    }

    async uploadFileByBuffer(objectName: string, base64Data: string)
    {
        const buffer = Buffer.from(base64Data, 'base64');

        return await this.filesystem.putObject(this.bucketName, objectName, buffer);
    }

    async downloadFile(objectName: string): Promise<string>
    {
        const filePath = this.pathTemp + objectName;

        await this.filesystem.fGetObject(this.bucketName, objectName, filePath);

        return filePath;
    }

    async downloadStreamFile(objectName: string): Promise<internal.Readable>
    {
        return await this.filesystem.getObject(this.bucketName, objectName);
    }

    async listObjects(prefix?: string, recursive?: boolean)
    {
        const stream = this.filesystem.listObjectsV2(this.bucketName, prefix, recursive);

        return new Promise((resolve, reject) =>
        {
            const files: any = [];

            stream.on('data', (obj: any) =>
            {
                files.push(obj);
            });

            stream.on('end', () => resolve(files));

            stream.on('close', () => resolve(files));

            stream.on('error', (error: any) => reject(error));
        });

    }

    async removeObjects(objectName: string): Promise<void>
    {
        await this.filesystem.removeObject(this.bucketName, objectName);
    }

    getClient(): any
    {
        return this.filesystem;
    }
}

export default MinioStrategy;
