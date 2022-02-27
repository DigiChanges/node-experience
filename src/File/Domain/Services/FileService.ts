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
import FileDTO from '../Payloads/FileDTO';
import IFileDTO from '../Payloads/IFileDTO';
import { validate } from 'uuid';

class FileService
{
    @containerFactory(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    private fileSystem = FilesystemFactory.create();

    async getPresignedGetObject(payload: PresignedFileRepPayload): Promise<string>
    {
        const filename = payload.getName();
        const expiry = payload.getExpiry();
        const isPublic = payload.getIsPublic();
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
        file.extension = payload.getExtension();
        file.path = payload.getPath();
        file.mimeType = payload.getMimeType();
        file.size = payload.getSize();
        file.isPublic = payload.getIsPublic();

        return await this.repository.save(file);
    }

    async uploadFileBase64(file: IFileDomain, payload: FileBase64RepPayload): Promise<any>
    {
        await this.fileSystem.uploadFileByBuffer(file, payload.getBase64());

        return file;
    }

    async uploadFileMultipart(file: IFileDomain, payload: FileMultipartRepPayload): Promise<any>
    {
        await this.fileSystem.uploadFile(file, payload.getFile().path);

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
        const name = payload.getName();
        const bucketNamePrivate = `${name}.private`;
        const bucketNamePublic = `${name}.public`;

        const region = payload.getRegion();
        const bucketPrivatePolicy = payload.getPrivateBucketPolicy();
        const bucketPublicPolicy = payload.getPublicBucketPolicy();

        await this.fileSystem.createBucket(bucketNamePrivate, region);
        await this.fileSystem.setBucketPolicy(bucketPrivatePolicy, bucketNamePrivate);

        await this.fileSystem.createBucket(bucketNamePublic, region);
        await this.fileSystem.setBucketPolicy(bucketPublicPolicy, bucketNamePublic);
    }

    async download(payload: IdPayload): Promise<IFileDTO>
    {
        const id = payload.getId();
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
