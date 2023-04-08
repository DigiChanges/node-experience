import { REPOSITORIES } from '../../../../Config/Injects';
import IUserRepository from '../../../Infrastructure/Repositories/User/IUserRepository';
import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';
import UserAssignRoleByEmailPayload from '../../Payloads/User/UserAssignRoleByEmailPayload';
import IRoleRepository from '../../../Infrastructure/Repositories/Role/IRoleRepository';

class AssignRoleByEmailUseCase
{
    private repository: IUserRepository;
    private roleRepository: IRoleRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
        this.roleRepository = container.resolve<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(payload: UserAssignRoleByEmailPayload): Promise<void>
    {
        const { email, rolesName } = payload;
        const user = void await this.repository.getOneByEmail(email);
        const roles: Record<string, any>[] = [];

        for await (const name of rolesName)
        {
            const role = await this.roleRepository.getOne(name);
            roles.push({ id: role.getId(), name: role.name });
        }

        await this.repository.assignRoles({ id: user.getId(), roles });
    }
}

export default AssignRoleByEmailUseCase;
