import { lazyInject } from '../../../inversify.config'
import IRole from "../../../InterfaceAdapters/IEntities/IRole";
import RoleUpdatePayload from "../../../InterfaceAdapters/Payloads/Roles/RoleUpdatePayload";
import IRoleRepository from "../../../InterfaceAdapters/IRepositories/IRoleRepository";
import {REPOSITORIES} from "../../../repositories";

class UpdateRoleUseCase
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository;

    async handle(payload: RoleUpdatePayload): Promise<IRole>
    {
        const id = payload.id();
        let role: IRole = await this.repository.findOne(id);

        role.name = payload.name();
        role.slug = payload.slug();
        role.permissions = payload.permissions();
        role.enable = payload.enable();

        await this.repository.save(role);

        return role;
    }
}

export default UpdateRoleUseCase;
