import { Client } from 'minio';
import internal from 'stream';

import { IFilesystem } from '../../Domain/Shared/IFilesystem';
import { FileVersionPayload } from '../../../File/Domain/Payloads/FileVersionPayload';
import { ListObjectsPayload } from '../../../File/Domain/Payloads/ListObjectsPayload';

export interface MinioConfig
{
    endPoint: string;
    accessKey: string;
    secretKey: string;
    useSSL: boolean;
    port: number;
    publicBucket: string;
    privateBucket: string;
    rootPath: string;
    region: string;
}

export class MinioStrategy implements IFilesystem
{
    readonly #filesystem: Client;
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

    async presignedGetObject(object: FileVersionPayload, expiry: number, respHeaders?: { [key: string]: any; }): Promise<string>
    {
        const bucket = this.getBucket(object);
        return await this.#filesystem.presignedGetObject(bucket, `${this.#rootPath}${object.objectPath}`, expiry, respHeaders);
    }

    async presignedPutObject(objectPath: string, expiry: number, isPrivate = true): Promise<string>
    {
        return await this.#filesystem.presignedPutObject(this.getBucket(undefined, isPrivate), objectPath, expiry);
    }

    async createBucket(bucketPrivate: string, region?: string): Promise<void>
    {
        return await this.#filesystem.makeBucket(bucketPrivate ?? this.#privateBucket, region ?? this.#region);
    }

    async setBucketPolicy(bucketPolicy: string, bucketPrivate?: string): Promise<void>
    {
        return await this.#filesystem.setBucketPolicy(bucketPrivate ?? this.#privateBucket, bucketPolicy);
    }

    async uploadFile(object: FileVersionPayload, path: string)
    {
        const acl = object.isPublic ? 'public-read' : 'private';
        return await this.#filesystem.fPutObject(this.getBucket(object), `${this.#rootPath}${object.objectPath}`, path, { 'x-amz-acl': acl });
    }

    async uploadFileByBuffer(object: FileVersionPayload, base64Data: string)
    {
        const buffer = Buffer.from(base64Data, 'base64');

        return await this.#filesystem.putObject(this.getBucket(object), `${this.#rootPath}${object.objectPath}`, buffer, object.size, {
            'content-type': object.mimeType
        });
    }

    async downloadFile(object: FileVersionPayload, isPrivate = true): Promise<string>
    {
        const filePath = `${this.#pathTemp}${object.name}`;

        await this.#filesystem.fGetObject(this.getBucket(object), `${this.#rootPath}${object.objectPath}`, filePath);

        return filePath;
    }

    async downloadStreamFile(object: FileVersionPayload, isPrivate = true): Promise<internal.Readable>
    {
        return await this.#filesystem.getObject(this.getBucket(object), `${this.#rootPath}${object.objectPath}`);
    }

    async listObjects(payload: ListObjectsPayload)
    {
        const prefix = payload.prefix;
        const recursive = payload.recursive;
        const isPrivate = payload.isPublic;

        const stream = this.#filesystem.listObjectsV2(this.getBucket(undefined, isPrivate), prefix, recursive);

        return new Promise((resolve, reject) =>
        {
            const files: any = [];

            stream.on('data', (obj) =>
            {
                files.push(obj);
            });

            stream.on('end', () => resolve(files));

            stream.on('close', () => resolve(files));

            stream.on('error', (error) => reject(error));
        });
    }

    async removeObjects(object: FileVersionPayload): Promise<void>
    {
        await this.#filesystem.removeObject(this.getBucket(object), object.objectPath);
    }

    private getBucket(object?: FileVersionPayload, isPrivate = false): string
    {
        const _isPrivate = (object && typeof object.isPublic !== 'undefined') ? !object.isPublic : isPrivate;
        return _isPrivate ? this.#privateBucket : this.#publicBucket;
    }
}
