import { lazyInject } from '../../../inversify.config'
import UserAssignRolePayload from "../../../InterfaceAdapters/Payloads/Users/UserAssignRolePayload";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import {REPOSITORIES} from "../../../repositories";
import IUserDomain from "../../../InterfaceAdapters/IDomain/IUserDomain";
import IRoleRepository from "../../../InterfaceAdapters/IRepositories/IRoleRepository";

class AssignRoleUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;
    @lazyInject(REPOSITORIES.IRoleRepository)
    private roleRepository: IRoleRepository;

    async handle(payload: UserAssignRolePayload): Promise<IUserDomain>
    {
        const id = payload.id();
        let user: IUserDomain = await this.repository.getOne(id);

        user.clearRoles();

        for await (const roleId of payload.rolesId())
        {
            const role = await this.roleRepository.getOne(roleId);
            user.setRole(role);
        }

        return await this.repository.save(user);
    }
}

export default AssignRoleUseCase;
