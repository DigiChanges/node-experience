import MainConfig from '../../Config/MainConfig';
import { IFilesystem, MinioStrategy } from '@digichanges/shared-experience';

type FilesystemValueProp = typeof MinioStrategy;

class FilesystemFactory
{
    static create(_default?: 'minio'): IFilesystem
    {
        const config = MainConfig.getInstance().getConfig().filesystem;
        const filesystemKey = _default ?? config.default;
        const filesystemConfig =  config[filesystemKey];

        const strategy = new Map<string, FilesystemValueProp>();
        strategy.set('minio', MinioStrategy);

        return new (strategy.get(filesystemKey))(filesystemConfig);
    }
}

export default FilesystemFactory;
