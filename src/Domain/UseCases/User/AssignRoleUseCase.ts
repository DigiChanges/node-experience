import { lazyInject } from '../../../inversify.config'
import UserAssignRolePayload from "../../../InterfaceAdapters/Payloads/Users/UserAssignRolePayload";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import {REPOSITORIES} from "../../../repositories";
import IUserDomain from "../../../InterfaceAdapters/IDomain/IUserDomain";

class AssignRoleUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: UserAssignRolePayload): Promise<IUserDomain>
    {
        const id = payload.id();
        let user: IUserDomain = await this.repository.getOne(id);

        // user.roles = await payload.rolesId();

        return await this.repository.save(user);
    }
}

export default AssignRoleUseCase;
