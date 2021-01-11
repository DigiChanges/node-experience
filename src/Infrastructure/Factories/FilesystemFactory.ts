import Config from "config";
import IFilesystem from "../../InterfaceAdapters/Shared/IFilesystem";
import MinioStrategy from "../Filesystem/MinioStrategy";

class FilesystemFactory
{
    static create(encryptionConfig: string = Config.get('filesystem.default')): IFilesystem
    {
        if(encryptionConfig === 'minio')
        {
            const config = Config.get('filesystem.minio');

            return new MinioStrategy(config);
        }
    }
}

export default FilesystemFactory;