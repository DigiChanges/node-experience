import IUserDomain from '../../User/InterfaceAdapters/IUserDomain';
import IId from '../../App/InterfaceAcapters/IId';
import ITimestamps from '../../App/InterfaceAcapters/ITimestamps';

interface IItemSchema extends IId, ITimestamps
{
    name: string;
    type: number;
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;
}

export default IItemSchema;