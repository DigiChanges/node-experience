import IFileVersionDomain from './IFileVersionDomain';
import IFileBuild from './IFileBuild';
import IFileDomain from './IFileDomain';
import { Base } from '../../../Main/Domain/Entities';

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
        this.file = data?.file;
        this.originalName = data?.originalName;
        this.version = data?.file.currentVersion + 1;
        this.isPublic = data?.isPublic ?? false;
        this.isOptimized = data?.isOptimized;
        this.mimeType = data.mimeType;
        this.path = data?.path ?? '/';
        this.extension = data.extension;
        this.size = data.size;
        this.setName(data?.isOriginalName ?? false);
        this.setPath();
    }

    private setPath()
    {
        this.path = `/${this.file?.getId()}/${this.version}/`;
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

    public get objectPath(): string
    {
        return `${this.path}${this.name}`;
    }

    public get isImage(): boolean
    {
        return this.mimeType?.includes('image');
    }
}

export default FileVersion;
