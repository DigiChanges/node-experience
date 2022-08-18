import { Client } from 'minio';
import internal from 'stream';
import { MinioConfig } from '../../../Config/MainConfig';
import IFilesystem from './IFilesystem';
import IFileDomain from '../../../File/Domain/Entities/IFileDomain';
import ListObjectsPayload from '../../../File/Domain/Payloads/ListObjectsPayload';

class MinioStrategy implements IFilesystem
{
    readonly #filesystem: Client = null;
    readonly #publicBucket: string;
    readonly #privateBucket: string;
    readonly #rootPath: string;
    readonly #pathTemp: string;
    readonly #region: string;

    constructor(config: MinioConfig)
    {
        this.#publicBucket = config.publicBucket;
        this.#privateBucket = config.privateBucket;
        this.#rootPath = config.rootPath;
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
        return await this.#filesystem.presignedGetObject(bucket, `${this.#rootPath}/${object.name}`, expiry, respHeaders);
    }

    async presignedPutObject(objectName: string, expiry: number, isPrivate = true): Promise<string>
    {
        return await this.#filesystem.presignedPutObject(this.getBucket(null, isPrivate), objectName, expiry);
    }

    async createBucket(bucketPrivate: string, region?: string): Promise<void>
    {
        return await this.#filesystem.makeBucket(bucketPrivate || this.#privateBucket, region || this.#region);
    }

    async setBucketPolicy(bucketPolicy: string, bucketPrivate?: string): Promise<void>
    {
        return await this.#filesystem.setBucketPolicy(bucketPrivate || this.#privateBucket, bucketPolicy);
    }

    async uploadFile(object: IFileDomain, path: string)
    {
        const acl = object.isPublic ? 'public-read' : 'private';
        return await this.#filesystem.fPutObject(this.getBucket(object), `${this.#rootPath}/${object.name}`, path, { 'x-amz-acl': acl });
    }

    async uploadFileByBuffer(object: IFileDomain, base64Data: string)
    {
        const buffer = Buffer.from(base64Data, 'base64');

        return await this.#filesystem.putObject(this.getBucket(object), `${this.#rootPath}/${object.name}`, buffer, object.size, {
            'content-type': object.mimeType
        });
    }

    async downloadFile(objectName: string, isPrivate = true): Promise<string>
    {
        const filePath = `${this.#pathTemp}${objectName}`;

        await this.#filesystem.fGetObject(this.getBucket(null, isPrivate), `${this.#rootPath}/${objectName}`, filePath);

        return filePath;
    }

    async downloadStreamFile(object: IFileDomain, isPrivate = true): Promise<internal.Readable>
    {
        return await this.#filesystem.getObject(this.getBucket(object), `${this.#rootPath}/${object.name}`);
    }

    async listObjects(payload: ListObjectsPayload)
    {
        const prefix = payload.prefix;
        const recursive = payload.recursive;
        const isPrivate = payload.isPublic;

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
        return _isPrivate ? this.#privateBucket : this.#publicBucket;
    }

    getClient(): any
    {
        return this.#filesystem;
    }
}

export default MinioStrategy;
