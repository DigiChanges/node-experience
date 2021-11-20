import ItemUpdatePayload from '../../InterfaceAdapters/Payloads/ItemUpdatePayload';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IItemService from '../../InterfaceAdapters/IItemService';

class UpdateItemUseCase
{
    @containerFactory(SERVICES.IItemService)
    private itemService: IItemService;

    async handle(payload: ItemUpdatePayload, authUser: IUserDomain): Promise<IItemDomain>
    {
        return await this.itemService.update(payload, authUser);
    }
}

export default UpdateItemUseCase;
