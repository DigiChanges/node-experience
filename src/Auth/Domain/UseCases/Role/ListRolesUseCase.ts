import ICriteria from '../../../../Shared/Presentation/Requests/ICriteria';
import IPaginator from '../../../../Shared/Infrastructure/Orm/IPaginator';
import { REPOSITORIES } from '../../../../Config/Injects';
import IRoleRepository from '../../../Infrastructure/Repositories/Role/IRoleRepository';
import { getRequestContext } from '../../../../Shared/Utils/RequestContext';
import ValidatorSchema from '../../../../Shared/Utils/ValidatorSchema';
import CriteriaSchemaValidation from '../../../../Shared/Presentation/Validations/CriteriaSchemaValidation';

class ListRolesUseCase
{
    private repository: IRoleRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        await ValidatorSchema.handle(CriteriaSchemaValidation, payload);

        return await this.repository.list(payload);
    }
}

export default ListRolesUseCase;
