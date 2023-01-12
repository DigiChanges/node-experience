import IItemDomain from '../../Domain/Entities/IItemDomain';

import SaveItemUseCase from '../../Domain/UseCases/SaveItemUseCase';
import ListItemsUseCase from '../../Domain/UseCases/ListItemsUseCase';
import GetItemUseCase from '../../Domain/UseCases/GetItemUseCase';
import RemoveItemUseCase from '../../Domain/UseCases/RemoveItemUseCase';
import UpdateItemUseCase from '../../Domain/UseCases/UpdateItemUseCase';
import ValidatorSchema from '../../../Shared/Presentation/Shared/ValidatorSchema';
import ItemRepPayload from '../../Domain/Payloads/ItemRepPayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import ItemUpdatePayload from '../../Domain/Payloads/ItemUpdatePayload';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import ItemSchemaSaveValidation from '../Validations/ItemSchemaSaveValidation';
import CriteriaSchemaValidation from '../../../Shared/Presentation/Validations/CriteriaSchemaValidation';
import CriteriaPayload from '../../../Shared/Presentation/Validations/CriteriaPayload';
import ItemFilter from '../Criterias/ItemFilter';
import ItemSort from '../Criterias/ItemSort';
import Pagination from '../../../Shared/Presentation/Shared/Pagination';
import IdSchemaValidation from '../../../Shared/Presentation/Validations/IdSchemaValidation';
import RequestCriteria from '../../../Shared/Presentation/Requests/RequestCriteria';
import ItemSchemaUpdateValidation from '../Validations/ItemSchemaUpdateValidation';

class ItemController
{
    public async save(payload: ItemRepPayload): Promise<IItemDomain>
    {
        await ValidatorSchema.handle(ItemSchemaSaveValidation, payload);

        const useCase = new SaveItemUseCase();
        return await useCase.handle(payload);
    }

    public async list(payload: CriteriaPayload): Promise<IPaginator>
    {
        await ValidatorSchema.handle(CriteriaSchemaValidation, payload);

        const requestCriteria: ICriteria = new RequestCriteria(
            {
                filter: new ItemFilter(payload.query),
                sort: new ItemSort(payload.query),
                pagination: new Pagination(payload.query, payload.url)
            });

        const useCase = new ListItemsUseCase();
        return await useCase.handle(requestCriteria);
    }

    public async getOne(payload: IdPayload): Promise<IItemDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const useCase = new GetItemUseCase();
        return await useCase.handle(payload);
    }

    public async update(payload: ItemUpdatePayload): Promise<IItemDomain>
    {
        await ValidatorSchema.handle(ItemSchemaUpdateValidation, payload);

        const useCase = new UpdateItemUseCase();
        return await useCase.handle(payload);
    }

    public async remove(payload: IdPayload): Promise<IItemDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        const useCase = new RemoveItemUseCase();
        return await useCase.handle(payload);
    }
}

export default ItemController;
