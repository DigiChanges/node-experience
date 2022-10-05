import IFileVersionDomain from './IFileVersionDomain';
import Base from '../../../Shared/Domain/Entities/Base';
import IFileBuild from './IFileBuild';
import IFileDomain from './IFileDomain';

class FileVersion extends Base implements IFileVersionDomain
{
    name: string;
    originalName: string;
    mimeType: string;
    path: string;
    extension: string;
    size: number;
    version: number;
    isPublic: boolean;
    isOptimized: boolean;
    file: IFileDomain;

    constructor(data?: IFileBuild)
    {
        super();
        this.file = data.file;
        this.version = 1;
        this.isPublic = false;
        this.isOptimized = data?.isOptimized;
        this.originalName = data?.originalName ?? 'empty.jpg';
        this.setName(data?.hasOriginalName ?? false);
        this.setPath();
    }

    private setPath()
    {
        this.path = `/${this.file.getId()}/${this.version}/`;
    }

    public setName(hasOriginalName: boolean)
    {
        this.name = this._id;

        if (hasOriginalName)
        {
            this.name = this.originalName
                .toLowerCase()
                .replace(/^\s+|\s+$/gm, '')
                .replace(/\s+/g, ' ')
                .replace(/ /g, '_');
        }
    }
}

export default FileVersion;
