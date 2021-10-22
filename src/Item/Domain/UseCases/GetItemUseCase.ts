import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import ItemService from '../Services/ItemService';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';

class GetItemUseCase
{
    @containerFactory(SERVICES.IItemService)
    private itemService = new ItemService();

    async handle(payload: IdPayload): Promise<IItemDomain>
    {
        const id = payload.getId();
        return await this.itemService.getOne(id);
    }
}

export default GetItemUseCase;
