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
import FileMultipartRepPayload from '../../InterfaceAdapters/Payloads/FileMultipartRepPayload';
import FileRepPayload from '../../InterfaceAdapters/Payloads/FileRepPayload';
import CreateBucketPayload from '../../InterfaceAdapters/Payloads/CreateBucketPayload';
import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import FileDTO from '../../InterfaceAdapters/Payloads/FileDTO';
import IFileDTO from '../../InterfaceAdapters/Payloads/IFileDTO';

@injectable()
class FileService implements IFileService
{
    @containerFactory(REPOSITORIES.IFileRepository)
    private repository: IFileRepository;

    private filesystem = FilesystemFactory.create();

    async get_presigned_get_object(payload: PresignedFileRepPayload): Promise<string>
    {
        const filename = payload.get_name();
        const expiry = payload.get_expiry();
        const file: IFileDomain = await this.get_one(filename);

        return await this.get_file_url(file, expiry);
    }

    async persist(file: IFileDomain, payload: FileRepPayload): Promise<IFileDomain>
    {
        file.extension = payload.get_extension();
        file.original_name = payload.get_name();
        file.path = payload.get_path();
        file.mime_type = payload.get_mime_type();
        file.size = payload.get_size();

        return await this.repository.save(file);
    }

    async upload_file_base64(file: IFileDomain, payload: FileBase64RepPayload): Promise<any>
    {
        await this.filesystem.uploadFileByBuffer(file.name, payload.get_base64());

        return file;
    }

    async upload_file_multipart(file: IFileDomain, payload: FileMultipartRepPayload): Promise<any>
    {
        await this.filesystem.uploadFile(file.name, payload.get_file().path);

        return file;
    }

    async list(payload: ICriteria): Promise<IPaginator>
    {
        return this.repository.list(payload);
    }

    async list_objects(payload: ListObjectsPayload): Promise<any>
    {
        return await this.filesystem.listObjects(payload.get_prefix(), payload.get_recursive());
    }

    async get_one(id: string): Promise<IFileDomain>
    {
        return await this.repository.getOne(id);
    }

    async create_bucket(payload: CreateBucketPayload): Promise<void>
    {
        const bucket_name = payload.get_bucket_name();
        const region = payload.get_region();
        const bucket_policy = payload.get_bucket_policy();

        await this.filesystem.createBucket(bucket_name, region);
        await this.filesystem.setBucketPolicy(bucket_policy, bucket_name);
    }

    async download(payload: IdPayload): Promise<IFileDTO>
    {
        const id = payload.get_id();
        const metadata: IFileDomain = await this.get_one(id);
        const stream = await this.filesystem.downloadStreamFile(id);

        return new FileDTO(metadata, stream);
    }

    public async get_file_url(file: IFileDomain, expiry: number): Promise<string>
    {
        const metadata = {
            'Content-Type': file.mime_type,
            'Content-Length': file.size
        };

        return await this.filesystem.presignedGetObject(file.get_id(), expiry, metadata);
    }
}

export default FileService;
