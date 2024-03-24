import { REPOSITORIES } from '../../../Shared/DI/Injects';
import IItemRepository from '../Repositories/IItemRepository';
import DependencyInjector from '../../../Shared/DI/DependencyInjector';
import ValidatorSchema from '../../../Main/Domain/Shared/ValidatorSchema';
import CriteriaSchemaValidation from '../../../Main/Domain/Validations/CriteriaSchemaValidation';
import { ICriteria } from '../../../Main/Domain/Criteria';
import { IPaginator } from '../../../Main/Domain/Criteria/IPaginator';

class ListItemsUseCase
{
    private repository: IItemRepository;

    constructor()
    {
        this.repository = DependencyInjector.inject<IItemRepository>(REPOSITORIES.IItemRepository);
    }

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        await ValidatorSchema.handle(CriteriaSchemaValidation, payload);

        return await this.repository.list(payload);
    }
}

export default ListItemsUseCase;
