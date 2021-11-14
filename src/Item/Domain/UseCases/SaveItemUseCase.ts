import ItemRepPayload from '../../InterfaceAdapters/Payloads/ItemRepPayload';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import IItemService from '../../InterfaceAdapters/IItemService';

class SaveItemUseCase
{
    @containerFactory(SERVICES.IItemService)
    private itemService: IItemService;

    async handle(payload: ItemRepPayload, auth_user: IUserDomain): Promise<IItemDomain>
    {
        return await this.itemService.create(payload, auth_user);
    }
}

export default SaveItemUseCase;
