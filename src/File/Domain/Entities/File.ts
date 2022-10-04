import IFileDomain from './IFileDomain';
import Base from '../../../Shared/Domain/Entities/Base';
import IFileBuild from './IFileBuild';

class File extends Base implements IFileDomain
{
    name: string;
    originalName: string;
    mimeType: string;
    path: string;
    extension: string;
    size: number;
    version: number;
    isPublic: boolean;

    constructor(data?: IFileBuild)
    {
        super();
        this.version = 1;
        this.isPublic = false;
        this.originalName = data?.originalName ?? 'empty.jpg';
        this.setName(data?.hasOriginalName ?? false);
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

export default File;
