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

        const useCase = new SaveItemUseCase();
        return await useCase.handle(request, auth_user);
    }

    public async list(request: ICriteria): Promise<IPaginator>
    {
        await ValidatorRequest.handle(request);

        const useCase = new ListItemsUseCase();
        return await useCase.handle(request);
    }

    public async getOne(request: IdPayload): Promise<IItemDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new GetItemUseCase();
        return await useCase.handle(request);
    }

    public async update(request: ItemUpdatePayload, auth_user: IUserDomain)
    {
        await ValidatorRequest.handle(request);

        const useCase = new UpdateItemUseCase();
        return await useCase.handle(request, auth_user);
    }

    public async remove(request: IdPayload)
    {
        await ValidatorRequest.handle(request);

        const useCase = new RemoveItemUseCase();
        return await useCase.handle(request);
    }
}

export default ItemController;
