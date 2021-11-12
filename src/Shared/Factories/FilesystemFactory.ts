import MainConfig from '../../Config/mainConfig';
import MinioStrategy from '../Filesystem/MinioStrategy';
import { IFilesystem } from '@digichanges/shared-experience';

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
