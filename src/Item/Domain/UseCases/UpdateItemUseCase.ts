import ItemUpdatePayload from '../../InterfaceAdapters/Payloads/ItemUpdatePayload';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';
import ItemService from '../Services/ItemService';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';

class UpdateItemUseCase
{
    @containerFactory(SERVICES.IItemService)
    private itemService = new ItemService();

    async handle(payload: ItemUpdatePayload, auth_user: IUserDomain): Promise<IItemDomain>
    {
        return await this.itemService.update(payload, auth_user);
    }
}

export default UpdateItemUseCase;
