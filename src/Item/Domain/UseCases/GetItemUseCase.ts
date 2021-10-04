import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import ItemService from '../Services/ItemService';

class GetItemUseCase
{
    private itemService = new ItemService();

    async handle(payload: IdPayload): Promise<IItemDomain>
    {
        const id = payload.getId();
        return await this.itemService.getOne(id);
    }
}

export default GetItemUseCase;
