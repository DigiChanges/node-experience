import Config from "config";
import IFilesystem from "../../InterfaceAdapters/Shared/IFilesystem";
import S3Strategy from "../Filesystem/S3Strategy";

class FilesystemFactory
{
    static create(encryptionConfig: string = Config.get('filesystem.default')): IFilesystem
    {
        if(encryptionConfig === Config.get('filesystem.s3.type'))
        {
            const config = Config.get('filesystem.s3');

            return new S3Strategy(config);
        }
    }
}

export default FilesystemFactory;