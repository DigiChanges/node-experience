import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import ItemService from '../Services/ItemService';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';

class RemoveItemUseCase
{
    @containerFactory(SERVICES.IItemService)
    private item_service = new ItemService();

    async handle(payload: IdPayload): Promise<IItemDomain>
    {
        const id = payload.getId();
        return await this.item_service.remove(id);
    }
}

export default RemoveItemUseCase;
