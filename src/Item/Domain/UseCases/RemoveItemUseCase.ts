import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IItemService from '../../InterfaceAdapters/IItemService';

class RemoveItemUseCase
{
    @containerFactory(SERVICES.IItemService)
    private itemService: IItemService;

    async handle(payload: IdPayload): Promise<IItemDomain>
    {
        const id = payload.getId();
        return await this.itemService.remove(id);
    }
}

export default RemoveItemUseCase;
