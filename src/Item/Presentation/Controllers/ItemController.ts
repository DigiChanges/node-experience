import IItemDomain from '../../InterfaceAdapters/IItemDomain';

import SaveItemUseCase from '../../Domain/UseCases/SaveItemUseCase';
import ListItemsUseCase from '../../Domain/UseCases/ListItemsUseCase';
import GetItemUseCase from '../../Domain/UseCases/GetItemUseCase';
import RemoveItemUseCase from '../../Domain/UseCases/RemoveItemUseCase';
import UpdateItemUseCase from '../../Domain/UseCases/UpdateItemUseCase';
import ValidatorRequest from '../../../App/Presentation/Shared/ValidatorRequest';
import ItemRepPayload from '../../InterfaceAdapters/Payloads/ItemRepPayload';
import { ICriteria, IPaginator } from '@digichanges/shared-experience';
import IdPayload from '../../../Shared/InterfaceAdapters/IdPayload';
import ItemUpdatePayload from '../../InterfaceAdapters/Payloads/ItemUpdatePayload';
import IUserDomain from '../../../User/InterfaceAdapters/IUserDomain';

class ItemController
{
    public async save(request: ItemRepPayload, auth_user: IUserDomain): Promise<IItemDomain>
    {
        await ValidatorRequest.handle(request);

        const use_case = new SaveItemUseCase();
        return await use_case.handle(request, auth_user);
    }

    public async list(request: ICriteria): Promise<IPaginator>
    {
        await ValidatorRequest.handle(request);

        const use_case = new ListItemsUseCase();
        return await use_case.handle(request);
    }

    public async get_one(request: IdPayload): Promise<IItemDomain>
    {
        await ValidatorRequest.handle(request);

        const use_case = new GetItemUseCase();
        return await use_case.handle(request);
    }

    public async update(request: ItemUpdatePayload, auth_user: IUserDomain)
    {
        await ValidatorRequest.handle(request);

        const use_case = new UpdateItemUseCase();
        return await use_case.handle(request, auth_user);
    }

    public async remove(request: IdPayload)
    {
        await ValidatorRequest.handle(request);

        const use_case = new RemoveItemUseCase();
        return await use_case.handle(request);
    }
}

export default ItemController;
