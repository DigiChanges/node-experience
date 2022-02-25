import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import Base from '../../../App/Domain/Entities/Base';

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

    constructor({ originalName = 'empty.jpg', isOriginalName = false })
    {
        super();
        this.version = 1;
        this.isPublic = false;
        this.originalName = originalName;
        this.setName(isOriginalName);
    }

    private setName(isOriginalName: boolean)
    {
        this.name = this._id;

        if (isOriginalName)
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
