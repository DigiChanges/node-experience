import UserAssignRoleBySlug from '../../Payloads/User/UserAssignRoleBySlug';
import IUserDomain from '../../Entities/IUserDomain';
import { REPOSITORIES } from '../../../../Config/Injects';
import IUserRepository from '../../../Infrastructure/Repositories/IUserRepository';
import IRoleRepository from '../../../Infrastructure/Repositories/IRoleRepository';
import { getRequestContext } from '../../../../Shared/Presentation/Shared/RequestContext';

class AssignRoleBySlugUseCase
{
    private repository: IUserRepository;
    private roleRepository: IRoleRepository;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
        this.roleRepository = container.resolve<IRoleRepository>(REPOSITORIES.IRoleRepository);
    }

    async handle(payload: UserAssignRoleBySlug): Promise<IUserDomain>
    {
        const { email, slugRole } = payload;

        const [user, role] = await Promise.all([
            this.repository.getOneByEmail(email),
            await this.roleRepository.getBySlug(slugRole)
        ]);

        user.setRole(role);

        return await this.repository.save(user);
    }
}

export default AssignRoleBySlugUseCase;
