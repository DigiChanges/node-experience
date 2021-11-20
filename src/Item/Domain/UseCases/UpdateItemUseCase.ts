import ItemUpdatePayload from '../../InterfaceAdapters/Payloads/ItemUpdatePayload';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';
import ItemService from '../Services/ItemService';

class UpdateItemUseCase
{
    private itemService = new ItemService();

    async handle(payload: ItemUpdatePayload, authUser: IUserDomain): Promise<IItemDomain>
    {
        return await this.itemService.update(payload, authUser);
    }
}

export default UpdateItemUseCase;
