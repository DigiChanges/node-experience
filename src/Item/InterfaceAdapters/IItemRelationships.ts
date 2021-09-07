import IUserDomain from '../../User/InterfaceAdapters/IUserDomain';
import IBaseAttributes from '../../App/InterfaceAcapters/IBaseAttributes';

interface IItemRelationships extends IBaseAttributes
{
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;
}

export default IItemRelationships;