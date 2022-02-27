import IBaseDomain from '../../../App/InterfaceAdapters/IBaseDomain';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';
import ItemUpdatePayload from '../Payloads/ItemUpdatePayload';

interface IItemDomain extends IBaseDomain
{
    name: string;
    type: number;
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;

    getCreatedBy(): IUserDomain;
    getLastModifiedBy(): IUserDomain;
    updateBuild(payload: ItemUpdatePayload): void;
}

export default IItemDomain;
