import MainConfig from '../../Config/MainConfig';
import MinioStrategy from '../Infrastructure/Filesystem/MinioStrategy';
import IFilesystem from '../Infrastructure/Filesystem/IFilesystem';

class FilesystemFactory
{
    static create(fileSystem: string =  MainConfig.getInstance().getConfig().filesystem.default): IFilesystem
    {
        const fileSystems: Record<string, any> = {
            minio: MinioStrategy
        };

        const fileSystemConfig: Record<string, any> = {
            minio: MainConfig.getInstance().getConfig().filesystem.minio
        };

        return new fileSystems[fileSystem](fileSystemConfig[fileSystem]);
    }
}

export default FilesystemFactory;
