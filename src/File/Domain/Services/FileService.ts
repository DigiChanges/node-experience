import { injectable } from 'inversify';
import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import FilesystemFactory from '../../../Shared/Factories/FilesystemFactory';
import IFileService from '../../InterfaceAdapters/IFileService';
import { containerFactory }  from '../../../Shared/Decorators/ContainerFactory';
import { REPOSITORIES } from '../../../Config/repositories';
import IFileRepository from '../../InterfaceAdapters/IFileRepository';
import PresignedFileRepPayload from 'File/InterfaceAdapters/Payloads/PresignedFileRepPayload';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import ListObjectsPayload from 'File/InterfaceAdapters/Payloads/ListObjectsPayload';
import FileBase64RepPayload from '../../InterfaceAdapters/Payloads/FileBase64RepPayload';
import File from '../Entities/File';
import FileMultipartRepPayload from '../../InterfaceAdapters/Payloads/FileMultipartRepPayload';
import FileRepPayload from '../../InterfaceAdapters/Payloads/FileRepPayload';
import FileUpdateMultipartPayload from '../../InterfaceAdapters/Payloads/FileUpdateMultipartPayload';
import FileUpdateBase64Payload from 'File/InterfaceAdapters/Payloads/FileUpdateBase64Payload';
import CreateBucketPayload from '../../InterfaceAdapters/Payloads/CreateBucketPayload';
import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import FileDTO from '../../InterfaceAdapters/Payloads/FileDTO';
import IFileDTO from '../../InterfaceAdapters/Payloads/IFileDTO';

@injectable()
class FileService implements IFileService
{
    @containerFactory(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

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
        file.originalName = payload.getName();
        file.path = payload.getPath();
        file.mimeType = payload.getMimeType();
        file.size = payload.getSize();

        return await this.repository.save(file);
    }

    async uploadFileBase64(payload: FileBase64RepPayload): Promise<any>
    {
        let file: IFileDomain = new File();
        file = await this.persist(file, payload);

        const filesystem = FilesystemFactory.create();
        await filesystem.uploadFileByBuffer(file.name, payload.getBase64());

        return file;
    }

    async uploadFileMultipart(payload: FileMultipartRepPayload): Promise<any>
    {
        let file: IFileDomain = new File();
        file = await this.persist(file, payload);

        const filesystem = FilesystemFactory.create();
        await filesystem.uploadFile(file.name, payload.getFile().path);

        return file;
    }

    async updateFileMultipart(payload: FileUpdateMultipartPayload): Promise<any>
    {
        const id = payload.getId();
        let file: IFileDomain = await this.getOne(id);
        file = await this.persist(file, payload);

        const filesystem = FilesystemFactory.create();
        await filesystem.uploadFile(file.name, payload.getFile().path);

        return file;
    }

    async updateFileBase64(payload: FileUpdateBase64Payload): Promise<any>
    {
        const id = payload.getId();
        let file: IFileDomain = await this.getOne(id);
        file = await this.persist(file, payload);

        const filesystem = FilesystemFactory.create();
        await filesystem.uploadFile(file.name, payload.getBase64());

        return file;
    }

    async list(payload: ICriteria): Promise<IPaginator>
    {
        return this.repository.list(payload);
    }

    async listObjects(payload: ListObjectsPayload): Promise<any>
    {
        const filesystem = FilesystemFactory.create();
        return await filesystem.listObjects(payload.getPrefix(), payload.getRecursive());
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

        const filesystem = FilesystemFactory.create();
        await filesystem.createBucket(bucketName, region);
        await filesystem.setBucketPolicy(bucketPolicy, bucketName);
    }

    async download(payload: IdPayload): Promise<IFileDTO>
    {
        const id = payload.getId();
        const metadata: IFileDomain = await this.getOne(id);

        const filesystem = FilesystemFactory.create();
        const stream = await filesystem.downloadStreamFile(id);

        return new FileDTO(metadata, stream);
    }

    public async getFileUrl(file: IFileDomain, expiry: number): Promise<string>
    {
        const  filesystem = FilesystemFactory.create();

        const metadata = {
            'Content-Type': file.mimeType,
            'Content-Length': file.size
        };

        return await filesystem.presignedGetObject(file.getId(), expiry, metadata);
    }
}

export default FileService;
