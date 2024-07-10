import IItemRepository from '../Repositories/IItemRepository';
import ValidatorSchema from '../../../Main/Domain/Shared/ValidatorSchema';
import CriteriaSchemaValidation from '../../../Main/Domain/Validations/CriteriaSchemaValidation';
import { ICriteria } from '../../../Main/Domain/Criteria';
import { IPaginator } from '../../../Main/Domain/Criteria/IPaginator';

class ListItemsUseCase
{
    constructor(private repository: IItemRepository)
    {
        this.repository = repository;
    }

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        await ValidatorSchema.handle(CriteriaSchemaValidation, payload);

        return await this.repository.list(payload);
    }
}

export default ListItemsUseCase;
