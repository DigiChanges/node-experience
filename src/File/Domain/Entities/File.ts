import Base from '../../../Shared/Domain/Entities/Base';
import IFileDomain from './IFileDomain';

class File extends Base implements IFileDomain
{
    currentVersion: number;

    constructor()
    {
        super();
        this.currentVersion = 0;
    }
}

export default File;
