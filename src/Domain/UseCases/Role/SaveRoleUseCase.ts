import { lazyInject } from '../../../inversify.config'
import RoleRepPayload from "../../../InterfaceAdapters/Payloads/Roles/RoleRepPayload";
import IRole from "../../../InterfaceAdapters/IEntities/IRole";
import IRoleRepository from "../../../InterfaceAdapters/IRepositories/IRoleRepository";
import Role from "../../../Infrastructure/Entities/Role";
import {REPOSITORIES} from "../../../repositories";

class SaveRoleUseCase
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository;

    async handle(payload: RoleRepPayload): Promise<IRole>
    {
        const role = new Role();
        role.name = payload.name();
        role.slug = payload.slug();
        role.permissions = payload.permissions();
        role.enable = payload.enable();

        await this.repository.save(role);

        return role;
    }
}

export default SaveRoleUseCase;
