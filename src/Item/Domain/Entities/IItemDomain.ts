import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';
import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';

interface IItemDomain extends IBaseDomain
{
    name: string;
    type: number;
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;
}

export default IItemDomain;
