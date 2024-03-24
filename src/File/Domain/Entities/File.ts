import IFileDomain from './IFileDomain';
import { Base } from '../../../Main/Domain/Entities';

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
