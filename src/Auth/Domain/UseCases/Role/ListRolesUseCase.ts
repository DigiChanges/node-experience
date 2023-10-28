import { IPaginator, ICriteria } from '@digichanges/shared-experience';
import { REPOSITORIES } from '../../../../Config/Injects';
import IRoleRepository from '../../../Infrastructure/Repositories/Role/IRoleRepository';
import container from '../../../../register';
import ValidatorSchema from '../../../../Main/Presentation/Utils/ValidatorSchema';
import CriteriaSchemaValidation from '../../../../Main/Presentation/Validations/CriteriaSchemaValidation';

class ListRolesUseCase
{
    private repository: IRoleRepository;

    constructor()
    {
        this.repository = container.resolve<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        await ValidatorSchema.handle(CriteriaSchemaValidation, payload);

        return await this.repository.list(payload);
    }
}

export default ListRolesUseCase;
