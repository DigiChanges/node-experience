import RoleRepPayload from '../../Payloads/Role/RoleRepPayload';
import IRoleDomain from '../../Entities/IRoleDomain';
import { REPOSITORIES } from '../../../../Config/Injects';
import IRoleRepository from '../../../Infrastructure/Repositories/Role/IRoleRepository';
import Role from '../../Entities/Role';
import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';

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
        const role = new Role(payload);

        return await this.repository.save(role);
    }
}

export default SaveRoleUseCase;
