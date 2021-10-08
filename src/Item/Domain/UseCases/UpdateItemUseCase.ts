import ItemUpdatePayload from '../../InterfaceAdapters/Payloads/ItemUpdatePayload';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';
import ItemService from '../Services/ItemService';

class UpdateItemUseCase
{
    private item_service = new ItemService();

    async handle(payload: ItemUpdatePayload, auth_user: IUserDomain): Promise<IItemDomain>
    {
        return await this.item_service.update(payload, auth_user);
    }
}

export default UpdateItemUseCase;
