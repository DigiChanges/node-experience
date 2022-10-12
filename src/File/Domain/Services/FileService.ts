import IFileVersionDomain from '../Entities/IFileVersionDomain';
import FilesystemFactory from '../../../Shared/Factories/FilesystemFactory';
import { REPOSITORIES } from '../../../Config/Injects';
import IFileVersionRepository from '../../Infrastructure/Repositories/IFileVersionRepository';
import PresignedFileRepPayload from 'File/Domain/Payloads/PresignedFileRepPayload';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import ListObjectsPayload from 'File/Domain/Payloads/ListObjectsPayload';
import FileBase64RepPayload from '../Payloads/FileBase64RepPayload';
import FileMultipartRepPayload from '../Payloads/FileMultipartRepPayload';
import FileRepPayload from '../Payloads/FileRepPayload';
import CreateBucketPayload from '../Payloads/CreateBucketPayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import FileVersionDTO from '../Models/FileVersionDTO';
import IFileVersionDTO from '../Models/IFileVersionDTO';
import { validate } from 'uuid';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import IFilesystem from '../../../Shared/Infrastructure/Filesystem/IFilesystem';
// @ts-ignore
import { CWebp } from 'cwebp';
import IFileMultipart from '../Entities/IFileMultipart';
import FileMultipartOptimizeDTO from '../../Presentation/Requests/FileMultipartOptimizeDTO';
import FileBase64OptimizeDTO from '../../Presentation/Requests/FileBase64OptimizeDTO';
import * as fs from 'fs';
import FileUpdateMultipartPayload from '../Payloads/FileUpdateMultipartPayload';
import FileUpdateMultipartOptimizeDTO from '../../Presentation/Requests/FileUpdateMultipartOptimizeDTO';
import FileUpdateBase64Payload from '../Payloads/FileUpdateBase64Payload';
import FileUpdateBase64OptimizeDTO from '../../Presentation/Requests/FileUpdateBase64OptimizeDTO';
import IFileRepository from '../../Infrastructure/Repositories/IFileRepository';
import IFileDomain from '../Entities/IFileDomain';
import File from '../Entities/File';
import IFileVersionOptimizeDTO from '../Payloads/IFileVersionOptimizeDTO';
import FileVersionOptimizeDTO from '../../Presentation/Requests/FileVersionOptimizeDTO';

class FileService
{
    private versionRepository: IFileVersionRepository;
    private fileRepository: IFileRepository;
    private fileSystem: IFilesystem;

    constructor()
    {
        const { container } = getRequestContext();
        this.versionRepository = container.resolve<IFileVersionRepository>(REPOSITORIES.IFileVersionRepository);
        this.fileRepository = container.resolve<IFileRepository>(REPOSITORIES.IFileRepository);
        this.fileSystem = FilesystemFactory.create();
    }

    async getOne(id: string): Promise<IFileDomain>
    {
        return await this.fileRepository.getOne(id);
    }

    async persist(): Promise<IFileDomain>
    {
        const file = new File();
        return this.fileRepository.save(file);
    }

    async getPresignedGetObject(payload: PresignedFileRepPayload): Promise<string>
    {
        const file = payload.file;
        const expiry = payload.expiry;
        const isPublic = payload.isPublic;
        let fileVersion: IFileVersionDomain;

        if (validate(file))
        {
            fileVersion = await this.versionRepository.getLastOneBy({ file });
        }
        else
        {
            fileVersion = await this.versionRepository.getLastOneBy({ name: file, isPublic });
        }

        return await this.getFileUrl(fileVersion, expiry);
    }

    async persistVersion(fileVersion: IFileVersionDomain, payload: FileRepPayload): Promise<IFileVersionDomain>
    {
        fileVersion.extension = payload.extension;
        fileVersion.mimeType = payload.mimeType;
        fileVersion.size = payload.size;
        fileVersion.isPublic = payload.isPublic;

        return await this.versionRepository.save(fileVersion);
    }

    async update(file: IFileDomain): Promise<IFileDomain>
    {
        file.currentVersion++;

        return this.fileRepository.save(file);
    }

    async uploadFileBase64(fileVersion: IFileVersionDomain, payload: FileBase64RepPayload): Promise<any>
    {
        await this.fileSystem.uploadFileByBuffer(fileVersion, payload.base64);

        return fileVersion;
    }

    async uploadFileMultipart(fileVersion: IFileVersionDomain, payload: FileMultipartRepPayload): Promise<any>
    {
        await this.fileSystem.uploadFile(fileVersion, payload.file.path);

        return fileVersion;
    }

    async uploadFileVersionOptimized(fileVersion: IFileVersionDomain, payload: IFileVersionOptimizeDTO): Promise<any>
    {
        await this.fileSystem.uploadFile(fileVersion, payload.file.path);

        return fileVersion;
    }

    async list(payload: ICriteria): Promise<IPaginator>
    {
        return this.versionRepository.list(payload);
    }

    async listObjects(payload: ListObjectsPayload): Promise<any>
    {
        return await this.fileSystem.listObjects(payload);
    }

    async getVersions(id: string): Promise<IFileVersionDomain[]>
    {
        return await this.versionRepository.getBy({ file: id });
    }

    async getLastVersions(file: string): Promise<IFileVersionDomain>
    {
        return await this.versionRepository.getLastOneBy({ file });
    }

    async getOneVersion(id: string): Promise<IFileVersionDomain>
    {
        return await this.versionRepository.getOne(id);
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

    async download(payload: IdPayload): Promise<IFileVersionDTO>
    {
        const id = payload.id;
        const fileVersion: IFileVersionDomain = await this.getLastVersions(id);

        const stream = await this.fileSystem.downloadStreamFile(fileVersion);

        return new FileVersionDTO(fileVersion, stream);
    }

    async getFileUrl(fileVersion: IFileVersionDomain, expiry: number): Promise<string>
    {
        const metadata = {
            'Content-Type': fileVersion.mimeType,
            'Content-Length': fileVersion.size
        };

        return await this.fileSystem.presignedGetObject(fileVersion, expiry, metadata);
    }

    async removeFile(id: string): Promise<IFileVersionDomain>
    {
        const fileVersion = await this.versionRepository.delete(id);
        void await this.fileSystem.removeObjects(fileVersion);
        return fileVersion;
    }

    private async getFileVersionOptimized(fileVersion: IFileVersionDomain): Promise<IFileMultipart>
    {
        const path = await this.fileSystem.downloadFile(fileVersion);
        const encoder = CWebp(path);
        const newPath = path.replace(fileVersion.extension, 'webp');
        await encoder.write(newPath);

        return {
            fieldname: fileVersion.name,
            originalname: fileVersion.originalName.replace(fileVersion.extension, 'webp'),
            encoding: '',
            mimetype: 'image/webp',
            destination: '',
            filename: fileVersion.name.replace(fileVersion.extension, 'webp'),
            path: newPath,
            size: fileVersion.size
        };
    }

    private async getFileMultipartOptimized(payload: FileMultipartRepPayload): Promise<IFileMultipart>
    {
        const encoder = CWebp(payload.file.path);
        const newPath = payload.file.path.replace(payload.extension, 'webp');
        await encoder.write(newPath);

        return {
            fieldname: payload.file.fieldname,
            originalname: payload.file.originalname.replace(payload.extension, 'webp'),
            encoding: payload.file.encoding,
            mimetype: 'image/webp',
            destination: payload.file.destination,
            filename: payload.file.filename.replace(payload.extension, 'webp'),
            path: newPath,
            size: payload.size
        };
    }

    private async getFileBase64Optimized(payload: FileBase64RepPayload): Promise<string>
    {
        const buffer = Buffer.from(payload.base64, 'base64');
        const encoder = CWebp(buffer);
        const newPath = '/tmp/converted.webp';
        await encoder.write(newPath);

        const buff = fs.readFileSync(newPath);
        return buff.toString('base64');
    }

    async optimizeMultipartToUpload(payload: FileMultipartRepPayload): Promise<FileMultipartRepPayload>
    {
        const fileVersion = await this.getFileMultipartOptimized(payload);

        return new FileMultipartOptimizeDTO(payload, fileVersion);
    }

    async optimizeMultipartToUpdate(payload: FileUpdateMultipartPayload): Promise<FileUpdateMultipartPayload>
    {
        const fileVersion = await this.getFileMultipartOptimized(payload);

        return new FileUpdateMultipartOptimizeDTO(payload, fileVersion);
    }

    async optimizeBase64ToUpload(payload: FileBase64RepPayload): Promise<FileBase64RepPayload>
    {
        const base64data = await this.getFileBase64Optimized(payload);

        return new FileBase64OptimizeDTO(payload, base64data);
    }

    async optimizeBase64ToUpdate(payload: FileUpdateBase64Payload): Promise<FileUpdateBase64Payload>
    {
        const base64data = await this.getFileBase64Optimized(payload);

        return new FileUpdateBase64OptimizeDTO(payload, base64data);
    }

    async optimizeFileVersion(fileVersion: IFileVersionDomain): Promise<IFileVersionOptimizeDTO>
    {
        const multipart = await this.getFileVersionOptimized(fileVersion);

        return new FileVersionOptimizeDTO(multipart, fileVersion);
    }
}

export default FileService;
