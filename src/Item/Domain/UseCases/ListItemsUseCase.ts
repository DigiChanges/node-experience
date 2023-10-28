import { IPaginator, ICriteria } from '@digichanges/shared-experience';
import { REPOSITORIES } from '../../../Config/Injects';
import IItemRepository from '../../Infrastructure/Repositories/IItemRepository';
import container from '../../../register';
import ValidatorSchema from '../../../Main/Presentation/Utils/ValidatorSchema';
import CriteriaSchemaValidation from '../../../Main/Presentation/Validations/CriteriaSchemaValidation';

class ListItemsUseCase
{
    private repository: IItemRepository;

    constructor()
    {
        this.repository = container.resolve<IItemRepository>(REPOSITORIES.IItemRepository);
    }

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        await ValidatorSchema.handle(CriteriaSchemaValidation, payload);

        return await this.repository.list(payload);
    }
}

export default ListItemsUseCase;
