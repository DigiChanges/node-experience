import { IFilesystem, MinioStrategy } from '@digichanges/shared-experience';
import { MainConfig } from '../../Config/MainConfig';

type FilesystemValueProp = typeof MinioStrategy;

class FilesystemFactory
{
    static create(_default?: 'minio'): IFilesystem
    {
        const config = MainConfig.getEnv();
        const filesystemKey = _default ?? config.FILESYSTEM_DEFAULT;
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

        const strategy = new Map<string, FilesystemValueProp>();
        strategy.set('minio', MinioStrategy);

        return new (strategy.get(filesystemKey))(filesystemConfig);
    }
}

export default FilesystemFactory;
