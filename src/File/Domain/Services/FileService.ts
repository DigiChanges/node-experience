// @ts-ignore
import { CWebp } from 'cwebp';
import { readFile, stat } from 'fs/promises';
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
import FileVersionDTO from '../Models/FileVersionDTO';
import IFileVersionDTO from '../Models/IFileVersionDTO';
import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import IFilesystem from '../../../Shared/Infrastructure/Filesystem/IFilesystem';
import IFileVersionPayload from '../Entities/IFileVersionPayload';
import FileMultipartOptimizeDTO from '../../Presentation/DTO/FileMultipartOptimizeDTO';
import FileBase64OptimizeDTO from '../../Presentation/DTO/FileBase64OptimizeDTO';
import FileUpdateMultipartPayload from '../Payloads/FileUpdateMultipartPayload';
import FileUpdateMultipartOptimizeDTO from '../../Presentation/DTO/FileUpdateMultipartOptimizeDTO';
import FileUpdateBase64Payload from '../Payloads/FileUpdateBase64Payload';
import FileUpdateBase64OptimizeDTO from '../../Presentation/DTO/FileUpdateBase64OptimizeDTO';
import IFileRepository from '../../Infrastructure/Repositories/IFileRepository';
import IFileDomain from '../Entities/IFileDomain';
import File from '../Entities/File';
import IFileVersionOptimizeDTO from '../Payloads/IFileVersionOptimizeDTO';
import FileVersionOptimizeDTO from '../../Presentation/DTO/FileVersionOptimizeDTO';
import IFileDTO from '../Models/IFileDTO';
import FileDTO from '../Models/FileDTO';
import DownloadPayload from '../Payloads/DownloadPayload';

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
        const { file, expiry, version } = payload;

        const fileVersion = await this.versionRepository.getLastOneByFields(file, version, { initThrow: true });

        return await this.getFileUrl(fileVersion, expiry);
    }

    async persistVersion(fileVersion: IFileVersionDomain): Promise<IFileVersionDomain>
    {
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

    async getVersions(file: string): Promise<IFileVersionDomain[]>
    {
        return await this.versionRepository.getAllByFileId(file);
    }

    async getLastVersions(file: string): Promise<IFileVersionDomain>
    {
        return await this.versionRepository.getLastOneByFields(file);
    }

    async getOneVersion(file: string, version: number): Promise<IFileVersionDomain>
    {
        return await this.versionRepository.getOneByFileIdAndVersion(file, version);
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

    async download(payload: DownloadPayload): Promise<IFileVersionDTO>
    {
        const { id, version } = payload;

        const fileVersion = !version ? await this.getLastVersions(id) : await this.getOneVersion(id, version);

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

    async removeFileAndVersions(id: string): Promise<IFileDTO>
    {
        const fileVersions = await this.versionRepository.getAllByFileId(id);

        for (const fileVersion of fileVersions)
        {
            await this.fileSystem.removeObjects(fileVersion);
            await this.versionRepository.delete(fileVersion.getId());
        }

        const file = await this.fileRepository.delete(id);

        return new FileDTO(file, fileVersions);
    }

    private async getFileVersionOptimized(fileVersion: IFileVersionDomain): Promise<IFileVersionPayload>
    {
        const path = await this.fileSystem.downloadFile(fileVersion);
        const encoder = CWebp(path);
        const newPath = path.replace(fileVersion.extension, 'webp');
        await encoder.write(newPath);

        return {
            originalName: fileVersion.originalName.replace(fileVersion.extension, 'webp'),
            encoding: '',
            mimeType: 'image/webp',
            destination: '',
            extension: 'webp',
            filename: fileVersion.name.replace(fileVersion.extension, 'webp'),
            path: newPath,
            size: fileVersion.size,
            isImage: true
        };
    }

    private async getFileMultipartOptimized(payload: IFileVersionPayload): Promise<IFileVersionPayload>
    {
        const path = `${payload.destination}/${payload.filename}`;
        const encoder = CWebp(path);
        const newPath = path.replace(payload.extension, 'webp');
        await encoder.write(newPath);

        return {
            originalName: payload.originalName.replace(payload.extension, 'webp'),
            mimeType: 'image/webp',
            destination: payload.destination,
            extension: 'webp',
            filename: payload.filename.replace(payload.extension, 'webp'),
            path: newPath,
            size: (await stat(newPath)).size,
            encoding: payload.encoding,
            isImage: payload.isImage
        };
    }

    private async getFileBase64Optimized(payload: FileBase64RepPayload): Promise<string>
    {
        const buffer = Buffer.from(payload.base64, 'base64');
        const encoder = CWebp(buffer);
        const newPath = '/tmp/converted.webp';
        await encoder.write(newPath);

        const buff = await readFile(newPath);
        return buff.toString('base64');
    }

    async optimizeMultipartToUpload(payload: FileMultipartRepPayload): Promise<FileMultipartRepPayload>
    {
        const { file, query } = payload;
        const fileVersion = await this.getFileMultipartOptimized(file);

        return new FileMultipartOptimizeDTO(fileVersion, query);
    }

    async optimizeMultipartToUpdate(payload: FileUpdateMultipartPayload): Promise<FileUpdateMultipartPayload>
    {
        const { file, query } = payload;
        const fileVersion = await this.getFileMultipartOptimized(file);

        return new FileUpdateMultipartOptimizeDTO(fileVersion, query);
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
