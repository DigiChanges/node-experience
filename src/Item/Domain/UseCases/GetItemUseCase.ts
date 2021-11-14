import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import ItemService from '../Services/ItemService';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IItemService from '../../InterfaceAdapters/IItemService';

class GetItemUseCase
{
    @containerFactory(SERVICES.IItemService)
    private itemService: IItemService;

    async handle(payload: IdPayload): Promise<IItemDomain>
    {
        const id = payload.getId();
        return await this.itemService.getOne(id);
    }
}

export default GetItemUseCase;
