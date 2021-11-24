import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import FilesystemFactory from '../../../Shared/Factories/FilesystemFactory';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../../Config/Injects/repositories';
import IFileRepository from '../../InterfaceAdapters/IFileRepository';
import PresignedFileRepPayload from 'File/InterfaceAdapters/Payloads/PresignedFileRepPayload';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import ListObjectsPayload from 'File/InterfaceAdapters/Payloads/ListObjectsPayload';
import FileBase64RepPayload from '../../InterfaceAdapters/Payloads/FileBase64RepPayload';
import FileMultipartRepPayload from '../../InterfaceAdapters/Payloads/FileMultipartRepPayload';
import FileRepPayload from '../../InterfaceAdapters/Payloads/FileRepPayload';
import CreateBucketPayload from '../../InterfaceAdapters/Payloads/CreateBucketPayload';
import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import FileDTO from '../../InterfaceAdapters/Payloads/FileDTO';
import IFileDTO from '../../InterfaceAdapters/Payloads/IFileDTO';

class FileService
{
    @containerFactory(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    private fileSystem = FilesystemFactory.create();

    async getPresignedGetObject(payload: PresignedFileRepPayload): Promise<string>
    {
        const filename = payload.getName();
        const expiry = payload.getExpiry();
        const file: IFileDomain = await this.getOne(filename);

        return await this.getFileUrl(file, expiry);
    }

    async persist(file: IFileDomain, payload: FileRepPayload): Promise<IFileDomain>
    {
        file.extension = payload.getExtension();
        file.originalName = payload.getOriginalName();
        file.path = payload.getPath();
        file.mimeType = payload.getMimeType();
        file.size = payload.getSize();

        return await this.repository.save(file);
    }

    async uploadFileBase64(file: IFileDomain, payload: FileBase64RepPayload): Promise<any>
    {
        await this.fileSystem.uploadFileByBuffer(file.name, payload.getBase64());

        return file;
    }

    async uploadFileMultipart(file: IFileDomain, payload: FileMultipartRepPayload): Promise<any>
    {
        await this.fileSystem.uploadFile(file.name, payload.getFile().path);

        return file;
    }

    async list(payload: ICriteria): Promise<IPaginator>
    {
        return this.repository.list(payload);
    }

    async listObjects(payload: ListObjectsPayload): Promise<any>
    {
        return await this.fileSystem.listObjects(payload.getPrefix(), payload.getRecursive());
    }

    async getOne(id: string): Promise<IFileDomain>
    {
        return await this.repository.getOne(id);
    }

    async createBucket(payload: CreateBucketPayload): Promise<void>
    {
        const bucketName = payload.getBucketName();
        const region = payload.getRegion();
        const bucketPolicy = payload.getBucketPolicy();

        await this.fileSystem.createBucket(bucketName, region);
        await this.fileSystem.setBucketPolicy(bucketPolicy, bucketName);
    }

    async download(payload: IdPayload): Promise<IFileDTO>
    {
        const id = payload.getId();
        const metadata: IFileDomain = await this.getOne(id);
        const stream = await this.fileSystem.downloadStreamFile(id);

        return new FileDTO(metadata, stream);
    }

    async getFileUrl(file: IFileDomain, expiry: number): Promise<string>
    {
        const metadata = {
            'Content-Type': file.mimeType,
            'Content-Length': file.size
        };

        return await this.fileSystem.presignedGetObject(file.getId(), expiry, metadata);
    }

    async removeFile(id: string): Promise<IFileDomain>
    {
        const file = await this.repository.delete(id);
        void await this.fileSystem.removeObjects(file.name);
        return file;
    }
}

export default FileService;
