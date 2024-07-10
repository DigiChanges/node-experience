import { InjectorModule } from '@deepkit/injector';
import CreateBucketUseCase from './Domain/UseCases/CreateBucketUseCase';
import DownloadUseCase from './Domain/UseCases/DownloadUseCase';
import GetFileMetadataUseCase from './Domain/UseCases/GetFileMetadataUseCase';
import GetPresignedGetObjectUseCase from './Domain/UseCases/GetPresignedGetObjectUseCase';
import ListFilesUseCase from './Domain/UseCases/ListFilesUseCase';
import ListObjectsUseCase from './Domain/UseCases/ListObjectsUseCase';
import OptimizeUseCase from './Domain/UseCases/OptimizeUseCase';
import RemoveFileUseCase from './Domain/UseCases/RemoveFileUseCase';
import UpdateFileBase64UseCase from './Domain/UseCases/UpdateFileBase64UseCase';
import UpdateFileMultipartUseCase from './Domain/UseCases/UpdateFileMultipartUseCase';
import UploadBase64UseCase from './Domain/UseCases/UploadBase64UseCase';
import UploadMultipartUseCase from './Domain/UseCases/UploadMultipartUseCase';
import IFileRepository from './Domain/Repositories/IFileRepository';
import FileMongooseRepository from './Infrastructure/Repositories/FileMongooseRepository';
import IFileVersionRepository from './Domain/Repositories/IFileVersionRepository';
import FileVersionMongooseRepository from './Infrastructure/Repositories/FileVersionMongooseRepository';
import FileService from './Domain/Services/FileService';
import { IFilesystem } from '../Main/Domain/Shared/IFilesystem';
import { FilesystemMockStrategy, MinioStrategy } from '../Main/Infrastructure/Filesystem';
import { MainConfig } from '../Config/MainConfig';

export const fileModule = new InjectorModule([
    // UseCases
    { provide: 'CreateBucketUseCase', useClass: CreateBucketUseCase },
    { provide: 'DownloadUseCase', useClass: DownloadUseCase },
    { provide: 'GetFileMetadataUseCase', useClass: GetFileMetadataUseCase },
    { provide: 'GetPresignedGetObjectUseCase', useClass: GetPresignedGetObjectUseCase },
    { provide: 'ListFilesUseCase', useClass: ListFilesUseCase },
    { provide: 'ListObjectsUseCase', useClass: ListObjectsUseCase },
    { provide: 'OptimizeUseCase', useClass: OptimizeUseCase },
    { provide: 'RemoveFileUseCase', useClass: RemoveFileUseCase },
    { provide: 'UpdateFileBase64UseCase', useClass: UpdateFileBase64UseCase },
    { provide: 'UpdateFileMultipartUseCase', useClass: UpdateFileMultipartUseCase },
    { provide: 'UploadBase64UseCase', useClass: UploadBase64UseCase },
    { provide: 'UploadMultipartUseCase', useClass: UploadMultipartUseCase },

    // Repositories
    { provide: IFileRepository, useClass: FileMongooseRepository },
    { provide: IFileVersionRepository, useClass: FileVersionMongooseRepository },

    // Services
    { provide: FileService, useClass: FileService },

    // Filesystem
    { provide: IFilesystem, useFactory: () =>
    {
        const config = MainConfig.getEnv();

        const filesystemConfig = {
            endPoint: config.MINIO_HOST,
            accessKey: config.MINIO_ACCESS_KEY,
            secretKey: config.MINIO_SECRET_KEY,
            useSSL: config.MINIO_USE_SSL,
            port: config.MINIO_PORT,
            publicBucket: config.MINIO_PUBLIC_BUCKET,
            privateBucket: config.MINIO_PRIVATE_BUCKET,
            rootPath: '/data',
            region: config.MINIO_REGION
        };

        if (config.isTest)
        {
            return new FilesystemMockStrategy();
        }

        return new MinioStrategy(filesystemConfig);
    } }
]).forRoot();
