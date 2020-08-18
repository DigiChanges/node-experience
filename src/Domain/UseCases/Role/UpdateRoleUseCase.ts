import { lazyInject } from '../../../inversify.config'
import RoleUpdatePayload from "../../../InterfaceAdapters/Payloads/Roles/RoleUpdatePayload";
import IRoleRepository from "../../../InterfaceAdapters/IRepositories/IRoleRepository";
import {REPOSITORIES} from "../../../repositories";
import IRoleDomain from "../../../InterfaceAdapters/IDomain/IRoleDomain";

class UpdateRoleUseCase
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository;

    async handle(payload: RoleUpdatePayload): Promise<IRoleDomain>
    {
        const id = payload.id();
        let role: IRoleDomain = await this.repository.getOne(id);

        role.name = payload.name();
        role.slug = payload.slug();
        role.permissions = payload.permissions();
        role.enable = payload.enable();

        return await this.repository.save(role);
    }
}

export default UpdateRoleUseCase;
