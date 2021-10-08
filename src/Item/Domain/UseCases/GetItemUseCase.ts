import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import ItemService from '../Services/ItemService';

class GetItemUseCase
{
    private itemService = new ItemService();

    async handle(payload: IdPayload): Promise<IItemDomain>
    {
        const id = payload.get_id();
        return await this.itemService.get_one(id);
    }
}

export default GetItemUseCase;
