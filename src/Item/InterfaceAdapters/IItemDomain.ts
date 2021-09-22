import IBaseDomain from '../../App/InterfaceAcapters/IBaseDomain';
import IUserDomain from '../../User/InterfaceAdapters/IUserDomain';

interface IItemDomain extends IBaseDomain
{
    name: string;
    type: number;
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;

    getCreatedBy(): IUserDomain;
    getLastModifiedBy(): IUserDomain;
}

export default IItemDomain;
