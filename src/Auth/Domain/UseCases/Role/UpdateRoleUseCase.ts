import RoleUpdatePayload from '../../Payloads/Role/RoleUpdatePayload';
import IRoleDomain from '../../Entities/IRoleDomain';
import { REPOSITORIES } from '../../../../Config/Injects';
import IRoleRepository from '../../../Infrastructure/Repositories/Role/IRoleRepository';
import { getRequestContext } from '../../../../Shared/Utils/RequestContext';
import ValidatorSchema from '../../../../Shared/Utils/ValidatorSchema';
import RoleSchemaUpdateValidation from '../../../Presentation/Validations/Role/RoleSchemaUpdateValidation';

class UpdateRoleUseCase
{
    private repository: IRoleRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(payload: RoleUpdatePayload): Promise<IRoleDomain>
    {
        await ValidatorSchema.handle(RoleSchemaUpdateValidation, payload);

        const role: IRoleDomain = await this.repository.getOne(payload.id);
        role.updateBuild(payload);

        return await this.repository.update(role, payload.id);
    }
}

export default UpdateRoleUseCase;
