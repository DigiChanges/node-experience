import IBaseDomain from '../../../Shared/Domain/Entities/IBaseDomain';
import IUserDomain from '../../../User/Domain/Entities/IUserDomain';
import ItemRepPayload from '../Payloads/ItemRepPayload';

interface IItemDomain extends IBaseDomain
{
    name: string;
    type: number;
    createdBy: IUserDomain;
    lastModifiedBy: IUserDomain;

    getCreatedBy(): IUserDomain;
    getLastModifiedBy(): IUserDomain;
    updateBuild(payload: ItemRepPayload): void;
}

export default IItemDomain;
