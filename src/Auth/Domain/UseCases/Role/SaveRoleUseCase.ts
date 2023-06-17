import RoleRepPayload from '../../Payloads/Role/RoleRepPayload';
import IRoleDomain from '../../Entities/IRoleDomain';
import { REPOSITORIES } from '../../../../Config/Injects';
import IRoleRepository from '../../../Infrastructure/Repositories/Role/IRoleRepository';
import Role from '../../Entities/Role';
import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';
import ValidatorSchema from '../../../../Shared/Presentation/Shared/ValidatorSchema';
import RoleSchemaSaveValidation from '../../../Presentation/Validations/Role/RoleSchemaSaveValidation';

class SaveRoleUseCase
{
    private repository: IRoleRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(payload: RoleRepPayload): Promise<IRoleDomain>
    {
        await ValidatorSchema.handle(RoleSchemaSaveValidation, payload);

        const role = new Role(payload);
        return await this.repository.save(role);
    }
}

export default SaveRoleUseCase;
