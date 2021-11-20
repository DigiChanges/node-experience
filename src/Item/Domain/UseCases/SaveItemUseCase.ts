import ItemRepPayload from '../../InterfaceAdapters/Payloads/ItemRepPayload';
import IItemDomain from '../../InterfaceAdapters/IItemDomain';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';
import ItemService from '../Services/ItemService';

class SaveItemUseCase
{
    private itemService = new ItemService();

    async handle(payload: ItemRepPayload, authUser: IUserDomain): Promise<IItemDomain>
    {
        return await this.itemService.create(payload, authUser);
    }
}

export default SaveItemUseCase;
