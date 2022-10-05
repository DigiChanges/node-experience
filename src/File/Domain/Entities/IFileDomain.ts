import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';

interface IFileDomain extends IBaseDomain
{
    currentVersion: number;
}

export default IFileDomain;
