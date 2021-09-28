import ItemRepPayload from '../../InterfaceAdapters/Payloads/ItemRepPayload';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';
import ItemService from '../Services/ItemService';

class SaveItemUseCase
{
    private itemService: ItemService = new ItemService();

    async handle(payload: ItemRepPayload, auth_user: IUserDomain): Promise<IItemDomain>
    {
        return await this.itemService.create(payload, auth_user);
    }
}

export default SaveItemUseCase;
