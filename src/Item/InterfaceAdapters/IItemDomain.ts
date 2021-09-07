import IBaseDomain from '../../App/InterfaceAcapters/IBaseDomain';
import IUserDomain from '../../User/InterfaceAdapters/IUserDomain';

interface IItemDomain extends IBaseDomain
{
    name: string;
    type: number;

    getCreatedBy(): IUserDomain;
    setCreatedBy(createdBy: IUserDomain): void;
    getLastModifiedBy(): IUserDomain;
    setLastModifiedBy(lastModifiedBy: IUserDomain): void;
}

export default IItemDomain;
