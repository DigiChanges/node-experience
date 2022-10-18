import UserAssignRolePayload from '../../Payloads/User/UserAssignRolePayload';
import IUserDomain from '../../Entities/IUserDomain';
import { REPOSITORIES } from '../../../../Config/Injects';
import IUserRepository from '../../../Infrastructure/Repositories/IUserRepository';
import IRoleRepository from '../../../Infrastructure/Repositories/IRoleRepository';
import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';

class AssignRoleUseCase
{
    private repository: IUserRepository;
    private roleRepository: IRoleRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
        this.roleRepository = container.resolve<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(payload: UserAssignRolePayload): Promise<IUserDomain>
    {
        const { id } = payload;
        const user: IUserDomain = await this.repository.getOne(id);

        user.clearRoles();

        const roles = await this.roleRepository.getInBy({ _id: payload.rolesId });

        roles.forEach(role => user.setRole(role));

        return await this.repository.save(user);
    }
}

export default AssignRoleUseCase;
