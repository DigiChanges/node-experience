import IItemDomain from '../../Domain/Entities/IItemDomain';

import SaveItemUseCase from '../../Domain/UseCases/SaveItemUseCase';
import ListItemsUseCase from '../../Domain/UseCases/ListItemsUseCase';
import GetItemUseCase from '../../Domain/UseCases/GetItemUseCase';
import RemoveItemUseCase from '../../Domain/UseCases/RemoveItemUseCase';
import UpdateItemUseCase from '../../Domain/UseCases/UpdateItemUseCase';
import ValidatorRequest from '../../../Shared/Presentation/Shared/ValidatorRequest';
import ItemRepPayload from '../../Domain/Payloads/ItemRepPayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import ItemUpdatePayload from '../../Domain/Payloads/ItemUpdatePayload';
import IUserDomain from '../../../Auth/Domain/Entities/IUserDomain';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';

class ItemController
{
    public async save(request: ItemRepPayload, authUser: IUserDomain): Promise<IItemDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new SaveItemUseCase();
        return await useCase.handle(request, authUser);
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

    public async update(request: ItemUpdatePayload): Promise<IItemDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new UpdateItemUseCase();
        return await useCase.handle(request);
    }

    public async remove(request: IdPayload): Promise<IItemDomain>
    {
        await ValidatorRequest.handle(request);

        const useCase = new RemoveItemUseCase();
        return await useCase.handle(request);
    }
}

export default ItemController;
