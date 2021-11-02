import Config from 'config';
import MinioStrategy from '../Filesystem/MinioStrategy';
import { IFilesystem } from '@digichanges/shared-experience';

type FileSystem = 'minio';

class FilesystemFactory
{
    static create(fileSystem: FileSystem = Config.get('filesystem.default')): IFilesystem
    {
        const fileSystems = {
            minio: MinioStrategy
        };

        const fileSystemConfig = {
            minio: Config.get('filesystem.minio')
        };

        return new fileSystems[fileSystem](fileSystemConfig[fileSystem]);
    }
}

export default FilesystemFactory;
