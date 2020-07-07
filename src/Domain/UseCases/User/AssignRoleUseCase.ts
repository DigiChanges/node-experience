import { lazyInject } from '../../../inversify.config'
import IUser from "../../../InterfaceAdapters/IEntities/IUser";
import UserAssignRolePayload from "../../../InterfaceAdapters/Payloads/Users/UserAssignRolePayload";
import IUserRepository from "../../../InterfaceAdapters/IRepositories/IUserRepository";
import {REPOSITORIES} from "../../../repositories";

class AssignRoleUseCase
{
    @lazyInject(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    async handle(payload: UserAssignRolePayload): Promise<IUser>
    {
        const id = payload.id();
        let user: IUser = await this.repository.findOne(id);

        user.roles = await payload.rolesId();

        await this.repository.save(user);

        return user;
    }
}

export default AssignRoleUseCase;
