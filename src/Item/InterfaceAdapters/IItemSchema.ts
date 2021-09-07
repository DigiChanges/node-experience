import IUserDomain from '../../User/InterfaceAdapters/IUserDomain';
import IBaseAttributes from '../../App/InterfaceAcapters/IBaseAttributes';
import IItemDomain from './IItemDomain';

interface IItemSchema extends IBaseAttributes, IItemDomain
{
    name: string;
    type: number;
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;
}

export default IItemSchema;