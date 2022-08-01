import IFileDomain from './IFileDomain';
import Base from '../../../Shared/Domain/Entities/Base';

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

    constructor({ originalName = 'empty.jpg', hasOriginalName = false })
    {
        super();
        this.version = 1;
        this.isPublic = false;
        this.originalName = originalName;
        this.setName(hasOriginalName);
    }

    private setName(hasOriginalName: boolean)
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
