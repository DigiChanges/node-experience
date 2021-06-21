import IItemDomain from '../../InterfaceAdapters/IItemDomain';

import SaveItemUseCase from '../../Domain/UseCases/SaveItemUseCase';
import ListItemsUseCase from '../../Domain/UseCases/ListItemsUseCase';
import GetItemUseCase from '../../Domain/UseCases/GetItemUseCase';
import RemoveItemUseCase from '../../Domain/UseCases/RemoveItemUseCase';
import UpdateItemUseCase from '../../Domain/UseCases/UpdateItemUseCase';
import ValidatorRequest from '../../../App/Presentation/Shared/Express/ValidatorRequest';
import ItemRepPayload from '../../InterfaceAdapters/Payloads/ItemRepPayload';
import {ICriteria, IPaginator} from '@digichanges/shared-experience';
import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import ItemUpdatePayload from '../../InterfaceAdapters/Payloads/ItemUpdatePayload';


class ItemController
{
    public async save(request: ItemRepPayload): Promise<IItemDomain>
    {
        await ValidatorRequest.handle(request);

        const saveItemUseCase = new SaveItemUseCase();
        return await saveItemUseCase.handle(request);
    }

    public async list(request: ICriteria): Promise<IPaginator>
    {
        await ValidatorRequest.handle(request);

        const listItemsUseCase = new ListItemsUseCase();
        return await listItemsUseCase.handle(request);
    }

    public async getOne(request: IdPayload): Promise<IItemDomain>
    {
        await ValidatorRequest.handle(request);

        const getItemUseCase = new GetItemUseCase();
        return await getItemUseCase.handle(request);
    }

    public async update(request: ItemUpdatePayload)
    {
        await ValidatorRequest.handle(request);

        const updateItemUseCase = new UpdateItemUseCase();
        return await updateItemUseCase.handle(request);
    }

    public async remove(request: IdPayload)
    {
        await ValidatorRequest.handle(request);

        const removeItemUseCase = new RemoveItemUseCase();
        return await removeItemUseCase.handle(request);
    }
}

export default ItemController;
