import { lazyInject } from '../../../inversify.config'
import RoleRepPayload from "../../../InterfaceAdapters/Payloads/Roles/RoleRepPayload";
import IRoleRepository from "../../../InterfaceAdapters/IRepositories/IRoleRepository";
import Role from "../../../Infrastructure/Entities/TypeORM/Role";
import {REPOSITORIES} from "../../../repositories";
import IRoleDomain from "../../../InterfaceAdapters/IDomain/IRoleDomain";

class SaveRoleUseCase
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository;

    async handle(payload: RoleRepPayload): Promise<IRoleDomain>
    {
        const role = new Role();
        role.name = payload.getName();
        role.slug = payload.getSlug();
        role.permissions = payload.getPermissions();
        role.enable = payload.getEnable();

        return await this.repository.save(role);
    }
}

export default SaveRoleUseCase;
