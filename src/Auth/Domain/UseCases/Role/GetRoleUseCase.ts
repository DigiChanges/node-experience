import IdPayload from '../../../../Shared/Presentation/Requests/IdPayload';
import IRoleDomain from '../../Entities/IRoleDomain';
import { REPOSITORIES } from '../../../../Config/Injects';
import IRoleRepository from '../../../Infrastructure/Repositories/Role/IRoleRepository';
import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';
import IdSchemaValidation from '../../../../Shared/Presentation/Validations/IdSchemaValidation';
import ValidatorSchema from '../../../../Shared/Presentation/Shared/ValidatorSchema';

class GetRoleUseCase
{
    private repository: IRoleRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(payload: IdPayload): Promise<IRoleDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        return await this.repository.getOne(payload.id);
    }
}

export default GetRoleUseCase;
