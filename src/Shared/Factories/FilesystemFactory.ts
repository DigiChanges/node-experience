import Config from 'config';
import MinioStrategy from '../Filesystem/MinioStrategy';
import { IFilesystem } from '@digichanges/shared-experience';

class FilesystemFactory
{
    static create(fileSystem: string = Config.get('filesystem.default')): IFilesystem
    {
        const fileSystems: Record<string, any> = {
            minio: MinioStrategy
        };

        const fileSystemConfig: Record<string, any> = {
            minio: Config.get('filesystem.minio')
        };

        return new fileSystems[fileSystem](fileSystemConfig[fileSystem]);
    }
}

export default FilesystemFactory;
