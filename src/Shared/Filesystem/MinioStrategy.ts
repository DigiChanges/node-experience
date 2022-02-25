import { Client } from 'minio';
import internal from 'stream';
import { MinioConfig } from '../../Config/mainConfig';
import IFilesystem from '../InterfaceAdapters/IFilesystem';
import IFileDomain from '../../File/InterfaceAdapters/IFileDomain';
import ListObjectsPayload from '../../File/InterfaceAdapters/Payloads/ListObjectsPayload';

class MinioStrategy implements IFilesystem
{
    readonly #filesystem: Client = null;
    readonly #bucketPublic: string;
    readonly #bucketPrivate: string;
    readonly #pathTemp: string;
    readonly #region: string;

    constructor(config: MinioConfig)
    {
        this.#bucketPublic = config.bucketPublic;
        this.#bucketPrivate = config.bucketPrivate;
        this.#region = config.region;
        this.#pathTemp = '/tmp/';

        this.#filesystem = new Client({
            endPoint: config.endPoint,
            accessKey: config.accessKey,
            secretKey: config.secretKey,
            region: config.region,
            port: config.port,
            useSSL: config.useSSL
        });
    }

    async presignedGetObject(object: IFileDomain, expiry: number, respHeaders?: { [key: string]: any; }): Promise<string>
    {
        const bucket = this.getBucket(object);
        return await this.#filesystem.presignedGetObject(bucket, object.name, expiry, respHeaders);
    }

    async presignedPutObject(objectName: string, expiry: number, isPrivate = true): Promise<string>
    {
        return await this.#filesystem.presignedPutObject(this.getBucket(null, isPrivate), objectName, expiry);
    }

    async createBucket(bucketPrivate: string, region?: string): Promise<void>
    {
        return await this.#filesystem.makeBucket(bucketPrivate || this.#bucketPrivate, region || this.#region);
    }

    async setBucketPolicy(bucketPolicy: string, bucketPrivate?: string): Promise<void>
    {
        return await this.#filesystem.setBucketPolicy(bucketPrivate || this.#bucketPrivate, bucketPolicy);
    }

    async uploadFile(object: IFileDomain, path: string)
    {
        return await this.#filesystem.fPutObject(this.getBucket(object), object.name, path, {});
    }

    async uploadFileByBuffer(object: IFileDomain, base64Data: string)
    {
        const buffer = Buffer.from(base64Data, 'base64');

        return await this.#filesystem.putObject(this.getBucket(object), object.name, buffer, object.size, {
            'content-type': object.mimeType
        });
    }

    async downloadFile(objectName: string, isPrivate = true): Promise<string>
    {
        const filePath = `${this.#pathTemp}${objectName}`;

        await this.#filesystem.fGetObject(this.getBucket(null, isPrivate), objectName, filePath);

        return filePath;
    }

    async downloadStreamFile(object: IFileDomain, isPrivate = true): Promise<internal.Readable>
    {
        return await this.#filesystem.getObject(this.getBucket(object), object.name);
    }

    async listObjects(payload: ListObjectsPayload)
    {
        const prefix = payload.getPrefix();
        const recursive = payload.getRecursive();
        const isPrivate = payload.getIsPublic();

        const stream = this.#filesystem.listObjectsV2(this.getBucket(null, isPrivate), prefix, recursive);

        return new Promise((resolve, reject) =>
        {
            const files: any = [];

            stream.on('data', (obj) =>
            {
                files.push(obj);
            });

            stream.on('end', () => resolve(files));

            stream.on('close', () => resolve(files));

            stream.on('error', (error: any) => reject(error));
        });
    }

    async removeObjects(object: IFileDomain): Promise<void>
    {
        await this.#filesystem.removeObject(this.getBucket(object), object.name);
    }

    private getBucket(object?: IFileDomain, isPublic = false): string
    {
        const _isPrivate = object?.isPublic ?? isPublic;
        return _isPrivate ? this.#bucketPrivate : this.#bucketPublic;
    }

    getClient(): any
    {
        return this.#filesystem;
    }
}

export default MinioStrategy;
