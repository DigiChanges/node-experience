import IFileDomain from '../../InterfaceAdapters/IFileDomain';
import Base from '../../../App/Domain/Entities/Base';

class File extends Base implements IFileDomain
{
    name: string;
    original_name: string;
    mime_type: string;
    path: string;
    extension: string;
    size: number;
    version: number;

    constructor()
    {
        super();
        this.name = this._id;
        this.version = 1;
    }
}

export default File;
