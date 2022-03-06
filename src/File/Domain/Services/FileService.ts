import IFileDomain from '../Entities/IFileDomain';
import FilesystemFactory from '../../../Shared/Factories/FilesystemFactory';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import IFileRepository from '../../Infrastructure/Repositories/IFileRepository';
import PresignedFileRepPayload from 'File/Domain/Payloads/PresignedFileRepPayload';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import ListObjectsPayload from 'File/Domain/Payloads/ListObjectsPayload';
import FileBase64RepPayload from '../Payloads/FileBase64RepPayload';
import FileMultipartRepPayload from '../Payloads/FileMultipartRepPayload';
import FileRepPayload from '../Payloads/FileRepPayload';
import CreateBucketPayload from '../Payloads/CreateBucketPayload';
import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import FileDTO from '../Models/FileDTO';
import IFileDTO from '../Models/IFileDTO';
import { validate } from 'uuid';

class FileService
{
    @containerFactory(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    private fileSystem = FilesystemFactory.create();

    async getPresignedGetObject(payload: PresignedFileRepPayload): Promise<string>
    {
        const filename = payload.name;
        const expiry = payload.expiry;
        const isPublic = payload.isPublic;
        let file: IFileDomain;

        if (validate(filename))
        {
            file = await this.getOne(filename);
        }
        else
        {
            file = await this.repository.getOneBy({ filename, isPublic });
        }

        return await this.getFileUrl(file, expiry);
    }

    async persist(file: IFileDomain, payload: FileRepPayload): Promise<IFileDomain>
    {
        file.extension = payload.extension;
        file.path = payload.path;
        file.mimeType = payload.mimeType;
        file.size = payload.size;
        file.isPublic = payload.isPublic;

        return await this.repository.save(file);
    }

    async uploadFileBase64(file: IFileDomain, payload: FileBase64RepPayload): Promise<any>
    {
        await this.fileSystem.uploadFileByBuffer(file, payload.base64);

        return file;
    }

    async uploadFileMultipart(file: IFileDomain, payload: FileMultipartRepPayload): Promise<any>
    {
        await this.fileSystem.uploadFile(file, payload.file.path);

        return file;
    }

    async list(payload: ICriteria): Promise<IPaginator>
    {
        return this.repository.list(payload);
    }

    async listObjects(payload: ListObjectsPayload): Promise<any>
    {
        return await this.fileSystem.listObjects(payload);
    }

    async getOne(id: string): Promise<IFileDomain>
    {
        return await this.repository.getOne(id);
    }

    async createBucket(payload: CreateBucketPayload): Promise<void>
    {
        const name = payload.name;
        const bucketNamePrivate = `${name}.private`;
        const bucketNamePublic = `${name}.public`;

        const region = payload.region;
        const bucketPrivatePolicy = payload.privateBucketPolicy;
        const bucketPublicPolicy = payload.publicBucketPolicy;

        await this.fileSystem.createBucket(bucketNamePrivate, region);
        await this.fileSystem.setBucketPolicy(bucketPrivatePolicy, bucketNamePrivate);

        await this.fileSystem.createBucket(bucketNamePublic, region);
        await this.fileSystem.setBucketPolicy(bucketPublicPolicy, bucketNamePublic);
    }

    async download(payload: IdPayload): Promise<IFileDTO>
    {
        const id = payload.id;
        const file: IFileDomain = await this.getOne(id);
        const stream = await this.fileSystem.downloadStreamFile(file);

        return new FileDTO(file, stream);
    }

    async getFileUrl(file: IFileDomain, expiry: number): Promise<string>
    {
        const metadata = {
            'Content-Type': file.mimeType,
            'Content-Length': file.size
        };

        return await this.fileSystem.presignedGetObject(file, expiry, metadata);
    }

    async removeFile(id: string): Promise<IFileDomain>
    {
        const file = await this.repository.delete(id);
        void await this.fileSystem.removeObjects(file);
        return file;
    }
}

export default FileService;
