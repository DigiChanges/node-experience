import Config from "config";
import MinioStrategy from "../Filesystem/MinioStrategy";
import {IFilesystem} from "@digichanges/shared-experience";

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