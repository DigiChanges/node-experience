import { IBaseDomain } from '../../../Main/Domain/Entities';

interface IFileDomain extends IBaseDomain
{
    currentVersion: number;
}

export default IFileDomain;
